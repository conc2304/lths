import { api } from '@lths/shared/data-access';

import { transformAssetResponse } from './transformer';
import {
  AssetListResponse,
  AssetsRequestProps,
  ArchiveAssetsResponse,
  UpdateAssetResponse,
  // CreateAssetResponse,
} from './types';
import { getAddAssetUrl, getAssetsUrl, getSecureUrl, getUpdateAssetUrl } from './urls';

const createAssetQuery = (request: AssetsRequestProps) => {
  const queryString = request?.queryString;
  return {
    url: getAssetsUrl(request),
    method: 'POST',
    body: {
      ...(queryString && { queryString: queryString }),
      sort: {
        direction: request.sort_order ?? 'desc',
        field: request.sort_key ?? 'created_at',
      },
    },
  };
};

export const assetsApi = api.enhanceEndpoints({ addTagTypes: ['Assets'] }).injectEndpoints({
  endpoints: (builder) => ({
    getAssetsItems: builder.query<AssetListResponse, AssetsRequestProps>({
      query: (request: AssetsRequestProps) => createAssetQuery(request),
      transformResponse: transformAssetResponse,
    }),
    // addResource: builder.mutation<CreateAssetResponse, { newAsset: File; user: string }>({
    //   query: (prop) => {
    //     const requestBody = new FormData();
    //     requestBody.append('file', prop.newAsset);
    //     requestBody.append('created_by', prop.user);
    //     return {
    //       url: getAddAssetUrl(),
    //       method: 'POST',
    //       body: requestBody,
    //     };
    //   },
    // }),
    createMedia: builder.mutation({
      query: (mediaData) => ({
        url: getAddAssetUrl(),
        method: 'POST',
        body: mediaData,
      }),
    }),
    secureUrlFetch: builder.query({
      query: (fileName) => ({
        url: getSecureUrl(fileName),
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data.signedUploadUrl,
    }),
    editResource: builder.mutation<UpdateAssetResponse, { id: string; original_file_name: string }>({
      query: (prop) => ({
        url: getUpdateAssetUrl(prop.id),
        method: 'PATCH',
        body: prop,
      }),
    }),
    deleteResource: builder.mutation<ArchiveAssetsResponse, { id: string }>({
      query: (prop) => ({
        url: getUpdateAssetUrl(prop.id),
        method: 'DELETE',
        body: prop.id,
      }),
    }),
  }),
});

export const {
  useGetAssetsItemsQuery,
  useLazyGetAssetsItemsQuery,
  // useAddResourceMutation,
  useLazySecureUrlFetchQuery,
  useCreateMediaMutation,
  useEditResourceMutation,
  useDeleteResourceMutation,
} = assetsApi;
