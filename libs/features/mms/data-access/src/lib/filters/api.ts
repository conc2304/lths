import { api } from '@lths/shared/data-access';
import { FilterAPIResponse, FilterFormResponse } from '@lths/types/ui-filters';

import { convertFilterResponse } from './response-transform';
import { getAnalyticFiltersUrl } from './urls';

export const filterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppFilters: builder.query<FilterFormResponse, void>({
      query: () => ({
        url: getAnalyticFiltersUrl(),
        method: 'GET',
      }),
      transformResponse: (response: FilterAPIResponse): FilterFormResponse => {
        if (!response.data || response.data.length === 0) return { data: [] };
        const convertedResponse = convertFilterResponse(response.data);
        return { data: convertedResponse };
      },
    }),
  }),
});

export const { useLazyGetAppFiltersQuery } = filterApi;
