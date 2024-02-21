import { api } from '@lths/shared/data-access';

import { transformAssetResponse } from './transformer';
import {
  AssetListResponse,
  AssetsRequestProps,
  ArchiveAssetsResponse,
  UpdateAssetResponse,
  CreateAssetResponse,
} from './types';
import { getAddAssetUrl, getAssetsUrl, getUpdateAssetUrl } from './urls';

const createAssetQuery = (request: AssetsRequestProps) => {
  const searchText = request?.queryString || undefined;
  return {
    url: getAssetsUrl(request),
    method: 'POST',
    body: {
      // dont send querystring if its empty
      queryString: searchText && searchText !== '' ? { search: searchText } : undefined,
      sort: {
        direction: request.sort_order ?? 'desc',
        field: request.sort_key ?? 'created_at',
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
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: [{ type: ASSETS_TAG, id: VIRTUAL_ID }],
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

export const {
  useGetAssetsItemsQuery,
  useLazyGetAssetsItemsQuery,
  useAddResourceMutation,
  useEditResourceMutation,
  useDeleteResourceMutation,
} = assetsApi;
