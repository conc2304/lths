import { api } from '@lths/shared/data-access';

import { ComponentListResponse } from './types';
import { getComponentsListUrl } from './urls';

export const pageApi = api.enhanceEndpoints({ addTagTypes: ['pages-components'] }).injectEndpoints({
  endpoints: (builder) => ({
    getComponentList: builder.query<ComponentListResponse, void>({
      query: () => ({
        url: getComponentsListUrl(),
        method: 'GET',
      }),

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['pages-components'],
    }),
  }),
});

export const { useLazyGetComponentListQuery } = pageApi;
