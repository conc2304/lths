import { api } from '@lths/shared/data-access';

import { transformAssetResponse } from './transformer';
import { AssetsResponse, AssetsRequest, Asset } from './types';
import { getAddAssetUrl, getAssetsUrl, getUpdateAssetUrl } from './urls';

export const assetsApi = api.enhanceEndpoints({ addTagTypes: ['Assets'] }).injectEndpoints({
  endpoints: (builder) => ({
    getAssetsItems: builder.query<AssetsResponse, AssetsRequest>({
      query: (request: AssetsRequest) => ({
        url: getAssetsUrl(request),
        method: 'GET',
      }),
      transformResponse: transformAssetResponse,
    }),
    addResource: builder.mutation<Asset, { newAsset: File; user: any }>({
      query: (prop) => {
        const requestBody = new FormData();
        requestBody.append('file', prop.newAsset);
        requestBody.append('created_by', prop.user?.first_name);
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
  useAddResourceMutation,
  useEditResourceMutation,
  useDeleteResourceMutation,
} = assetsApi;
