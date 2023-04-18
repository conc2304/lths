import { api } from '@lths/shared/data-access';

import { InsightRequest, InsightResponse } from './types';
import { getInsightUrl } from './urls';

export const insightOverviewApi = api.enhanceEndpoints({ addTagTypes: ['insight-overview'] }).injectEndpoints({
  endpoints: (builder) => ({
    getInsightOverview: builder.query<InsightResponse, InsightRequest>({
      query: () => ({
        url: getInsightUrl(),
        method: 'GET',
      }),

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['insight-overview'],
    }),
  }),
});

export const { useGetInsightOverviewQuery, useLazyGetInsightOverviewQuery } = insightOverviewApi;
