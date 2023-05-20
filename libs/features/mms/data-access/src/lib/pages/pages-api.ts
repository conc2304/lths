import { api } from '@lths/shared/data-access';

import { PagesDataRequest } from './types';
import { getPagesUrl } from './urls';

export const pagesApi = api.enhanceEndpoints({ addTagTypes: ['Pages'] }).injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetPagesItemsQuery, useLazyGetPagesItemsQuery } = pagesApi;
