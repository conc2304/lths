import { api } from '@lths/shared/data-access';
import { FormSchema, FilterGroupResponse } from '@lths/shared/ui-elements';

import { convertFilterResponse } from './response-transform';
import { getAnalyticFiltersUrl } from './urls';
import { ApiResponse } from '../types';

export const filterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppFilters: builder.query<FormSchema[], void>({
      query: () => ({
        url: getAnalyticFiltersUrl(),
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<FilterGroupResponse[]>): FormSchema[] => {
        if (!response.data || response.data.length === 0) return [];
        const convertedResponse = convertFilterResponse(response.data);
        return convertedResponse;
      },
    }),
  }),
});

export const { useLazyGetAppFiltersQuery } = filterApi;
