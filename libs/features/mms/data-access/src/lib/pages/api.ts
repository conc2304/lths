import { api } from '@lths/shared/data-access';

import { ComponentDetailResponse, ComponentListResponse } from './types';
import { PagesDataRequest } from './types';
import { getComponentDetailUrl, getComponentsListUrl } from './urls';
import { getPagesUrl } from './urls';

const pageApi = api.enhanceEndpoints({ addTagTypes: ['pages-components'] }).injectEndpoints({
  endpoints: (builder) => ({
    getComponentList: builder.query<ComponentListResponse, void>({
      query: () => ({
        url: getComponentsListUrl(),
        method: 'GET',
      }),

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['pages-components'],
    }),
    getComponentDetail: builder.query<ComponentDetailResponse, string>({
      query: (id) => ({
        url: getComponentDetailUrl(id),
        method: 'GET',
      }),
    }),
    getPagesItems: builder.query({
      query: (request: PagesDataRequest) => ({
        url: getPagesUrl(request),
        method: 'GET',
      }),
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['Pages'],
    }),
  }),
});

export const { useLazyGetComponentListQuery, useLazyGetComponentDetailQuery, useLazyGetPagesItemsQuery } = pageApi;
export default pageApi;
