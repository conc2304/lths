// import { api } from '@lths/shared/data-access';
import { api } from '@lths/shared/data-access';
import { FilterFormResponse } from '@lths/types/ui-filters';

import { getAnalyticFiltersUrl } from './urls';

export const filterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppFilters: builder.query<FilterFormResponse, void>({
      query: () => ({
        url: getAnalyticFiltersUrl(),
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetAppFiltersQuery } = filterApi;
