// assets-api.ts
import { api } from '@lths/shared/data-access';

import { AssetsResponse, AssetsRequest, Asset } from './types';
import { getAddAssetUrl, getAssetsUrl, getUpdateAssetUrl } from './urls';

export const assetsApi = api.enhanceEndpoints({ addTagTypes: ['Assets'] }).injectEndpoints({
  endpoints: (builder) => ({
    getAssetsItems: builder.query<AssetsResponse, AssetsRequest>({
      query: (request: AssetsRequest) => ({
        url: getAssetsUrl(request),
        method: 'GET',
      }),
    }),
    addResource: builder.mutation<Asset, Partial<Asset>>({
      query: (newAsset) => ({
        url: getAddAssetUrl(),
        method: 'POST',
        body: newAsset,
      }),
    }),
    editResource: builder.mutation<Asset, { id: string; original_file_name: string }>({
      query: (prop) => ({
        url: getUpdateAssetUrl(),
        method: 'PATCH',
        body: prop,
      }),
    }),
    deleteResource: builder.mutation<Asset, { _id: string }>({
      query: (prop) => ({
        url: getUpdateAssetUrl(),
        method: 'DELETE',
        body: prop,
      }),
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
