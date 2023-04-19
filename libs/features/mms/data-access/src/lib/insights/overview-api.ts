import { api } from '@lths/shared/data-access';

import { InsightHistogramResponse, InsightKpiResponse, InsightRequest, InsightResponse } from './types';
import { getInsightKpiUrl, getInsightUrl, getInsightOverviewHistogramUrl } from './urls';

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
    getInsightOverviewKpi: builder.query<InsightKpiResponse, InsightRequest>({
      query: () => ({
        url: getInsightKpiUrl(),
        method: 'GET',
      }),
    }),
    getInsightOverviewHistogram: builder.query<InsightHistogramResponse, InsightRequest>({
      query: () => ({
        url: getInsightOverviewHistogramUrl(),
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetInsightOverviewQuery,
  useLazyGetInsightOverviewQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewHistogramQuery,
} = insightOverviewApi;
