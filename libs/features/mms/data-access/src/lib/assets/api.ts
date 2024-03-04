import { api } from '@lths/shared/data-access';

import { transformAssetResponse } from './transformer';
import {
  AssetListResponse,
  AssetsRequestProps,
  ArchiveAssetsResponse,
  UpdateAssetResponse,
  CreateAssetResponse,
} from './types';
import { getAddAssetUrl, getAssetsUrl, getSecureCloudUploadUrl, getUpdateAssetUrl } from './urls';

const createAssetQuery = (request: AssetsRequestProps) => {
  const searchText = request?.queryString || undefined;
  return {
    url: getAssetsUrl(request),
    method: 'POST',
    body: {
      // dont send querystring if its empty
      queryString: searchText && searchText !== '' ? { search: searchText } : undefined,
      // on new upload force that upload to be at the top of the search
      sort: {
        direction: request.sort_order ?? 'asc',
        field: request.sort_key ?? 'original_file_name',
      },
    },
  };
};

const ASSETS_TAG = 'ASSETS';
const VIRTUAL_ID = 'ASSETS_CACHE';

export const assetsApi = api.enhanceEndpoints({ addTagTypes: ['Assets'] }).injectEndpoints({
  endpoints: (builder) => ({
    getAssetsItems: builder.query<AssetListResponse, AssetsRequestProps>({
      query: (request: AssetsRequestProps) => createAssetQuery(request),
      transformResponse: transformAssetResponse,
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      providesTags: (responseData) => {
        // an error occurred, but we still want to refetch this query when `{ type: 'ASSETS_TAG', id: 'VIRTUAL_ID' }` is invalidated
        const onErrorTags = [{ type: ASSETS_TAG, id: VIRTUAL_ID }];

        if (!responseData) return onErrorTags;

        const { data: assets } = responseData;
        return assets
          ? [...assets.map(({ _id }) => ({ type: ASSETS_TAG, id: _id } as const)), { type: ASSETS_TAG, id: VIRTUAL_ID }]
          : onErrorTags;
      },
    }),
    // todo does this need to be deprecated ???
    addResource: builder.mutation<CreateAssetResponse, { newAsset: File; user: string }>({
      query: (prop) => {
        const requestBody = new FormData();
        requestBody.append('file', prop.newAsset);
        requestBody.append('created_by', prop.user);
        return {
          url: getAddAssetUrl(),
          method: 'POST',
          body: requestBody,
          headers: { 'x-api-version': '1' },
        };
      },
    }),
    createMedia: builder.mutation({
      query: (mediaData) => ({
        url: getAddAssetUrl(),
        method: 'POST',
        body: mediaData,
        headers: {
          'x-api-version': '2',
        },
      }),
    }),
    getSecureUploadUrl: builder.query({
      query: (fileName) => ({
        url: getSecureCloudUploadUrl(fileName),
        method: 'GET',
      }),
      transformResponse: (response: { data: { signedUploadUrl: string }[] }) => response.data[0].signedUploadUrl,
    }),
    editResource: builder.mutation<UpdateAssetResponse, { id: string; original_file_name: string }>({
      query: (prop) => ({
        url: getUpdateAssetUrl(prop.id),
        method: 'PATCH',
        body: prop,
      }),
      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: (result, error, payload) => {
        const id = payload.id;
        if (!id) return;
        return [{ type: ASSETS_TAG, id: id }];
      },
    }),
    deleteResource: builder.mutation<ArchiveAssetsResponse, { id: string }>({
      query: (prop) => ({
        url: getUpdateAssetUrl(prop.id),
        method: 'DELETE',
        body: prop.id,
      }),
      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: (result, error, payload) => {
        const id = payload.id;
        if (!id) return;
        return [{ type: ASSETS_TAG, id: id }];
      },
    }),
  }),
});

// Make a call to Azure Blob Services to file upload
export const uploadFileToBlob = async (file: File, signedUrl: string) => {
  try {
    const response = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
        'x-ms-blob-type': 'BlockBlob',
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    console.log('File uploaded to Azure Blob storage.');
    return true;
  } catch (error) {
    console.error('Error uploading to Blob storage:', error);
    return false;
  }
};

export const {
  useGetAssetsItemsQuery,
  useLazyGetAssetsItemsQuery,
  useLazyGetSecureUploadUrlQuery,
  useAddResourceMutation,
  useEditResourceMutation,
  useDeleteResourceMutation,
  useCreateMediaMutation,
} = assetsApi;
