import { api } from '@lths/shared/data-access';
import { FilterSettingsQueryParams } from '@lths/shared/ui-elements';

import {
  getInsightUrl,
  getInsightOnboardingKpiColumnCardUrl,
  getInsightOnboardingKpiUrl,
  getInsightOnboardingHistogramUrl,
  // ToDo(onboarding): Replace with coloumn and flow graph
  // getInsightOnboardingColoumnUrl,
  getInsightOnboardingPreviewUrl,
} from './urls';
import {
  InsightHistogramResponse,
  InsightKpiColumnCardResponse,
  InsightKpiResponse,
  InsightResponse,
  PagesPreviewResponse,
} from '../types';

export const insightOnboardingApi = api.enhanceEndpoints({ addTagTypes: ['insight-Onboarding'] }).injectEndpoints({
  endpoints: (builder) => ({
    getInsightOnboarding: builder.query<InsightResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightUrl(),
        method: 'GET',
        params: queryStringParams,
      }),

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['insight-onboarding'],
    }),
    getInsightOnboardingKpiColumnCard: builder.query<InsightKpiColumnCardResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightOnboardingKpiColumnCardUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightOnboardingPreview: builder.query<PagesPreviewResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightOnboardingPreviewUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightOnboardingKpi: builder.query<InsightKpiResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightOnboardingKpiUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightOnboardingHistogram: builder.query<InsightHistogramResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightOnboardingHistogramUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    // ToDo(onboarding): Replace with coloumn and flow graph
  }),
});

export const {
  useGetInsightOnboardingQuery,
  useLazyGetInsightOnboardingQuery,
  useLazyGetInsightOnboardingKpiQuery,
  useLazyGetInsightOnboardingKpiColumnCardQuery,
  useLazyGetInsightOnboardingPreviewQuery,
  useLazyGetInsightOnboardingHistogramQuery,
} = insightOnboardingApi;
