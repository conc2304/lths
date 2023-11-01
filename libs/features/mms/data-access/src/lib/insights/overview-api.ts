import { api } from '@lths/shared/data-access';
import { FilterSettingsQueryParams } from '@lths/shared/ui-elements';

import {
  InsightHistogramResponse,
  InsightKpiResponse,
  InsightRequest,
  InsightResponse,
  InsightSegmentationResponse,
  InsightTabularResponse,
} from './types';
import {
  getInsightKpiUrl,
  getInsightUrl,
  getInsightOverviewHistogramUrl,
  getInsightOverviewSegmentationUrl,
  getInsightOverviewTabularUrl,
} from './urls';

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
    getInsightOverviewKpi: builder.query<InsightKpiResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightKpiUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightOverviewHistogram: builder.query<InsightHistogramResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightOverviewHistogramUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightOverviewSegmentation: builder.query<InsightSegmentationResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightOverviewSegmentationUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightOverviewTabular: builder.query<InsightTabularResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightOverviewTabularUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
  }),
});

export const {
  useGetInsightOverviewQuery,
  useLazyGetInsightOverviewQuery,
  useLazyGetInsightOverviewKpiQuery,
  useLazyGetInsightOverviewHistogramQuery,
  useLazyGetInsightOverviewSegmentationQuery,
  useLazyGetInsightOverviewTabularQuery,
} = insightOverviewApi;
