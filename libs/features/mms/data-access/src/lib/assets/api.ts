import { api } from '@lths/shared/data-access';

import { transformAssetResponse } from './transformer';
import { AssetsResponse, AssetsRequest, Asset } from './types';
import { getAddAssetUrl, getAssetsUrl, getUpdateAssetUrl, searchAssetsUrl } from './urls';

const createAssetQuery = (request: AssetsRequest, queryString?: string) => ({
  url: queryString ? searchAssetsUrl(request) : getAssetsUrl(request),
  method: 'POST',
  body: {
    ...(queryString && { queryString }),
    sort: {
      direction: request.sort_order ?? 'desc',
      field: request.sort_key ?? 'created_at',
    },
  },
});

export const assetsApi = api.enhanceEndpoints({ addTagTypes: ['Assets'] }).injectEndpoints({
  endpoints: (builder) => ({
    getAssetsItems: builder.query<AssetsResponse, AssetsRequest>({
      query: (request: AssetsRequest) => createAssetQuery(request),
      transformResponse: transformAssetResponse,
    }),
    searchAssets: builder.query<AssetsResponse, AssetsRequest>({
      query: (request: AssetsRequest) => createAssetQuery(request, request.queryString),
      transformResponse: transformAssetResponse,
    }),
    addResource: builder.mutation<Asset, { newAsset: File; user: string }>({
      query: (prop) => {
        const requestBody = new FormData();
        requestBody.append('file', prop.newAsset);
        requestBody.append('created_by', prop.user);
        return {
          url: getAddAssetUrl(),
          method: 'POST',
          body: requestBody,
        };
      },
    }),
    editResource: builder.mutation<Asset, { id: string; original_file_name: string }>({
      query: (prop) => ({
        url: getUpdateAssetUrl(prop.id),
        method: 'PATCH',
        body: prop,
      }),
    }),
    deleteResource: builder.mutation<Asset, { id: string }>({
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
  useLazySearchAssetsQuery,
  useAddResourceMutation,
  useEditResourceMutation,
  useDeleteResourceMutation,
} = assetsApi;
