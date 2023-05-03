import { api } from '@lths/shared/data-access';

import {
  getInsightUrl,
  getInsightOnboardingKpiColumnCardUrl,
  getInsightOnboardingKpiUrl,
  getInsightOnboardingHistogramUrl,
  // ToDo(onboarding): Replace with coloumn and flow graph
  // getInsightOnboardingColoumnUrl,
  // getInsightOnboardingFlowsUrl,
} from './urls';
import {
  InsightHistogramResponse,
  InsightKpiColumnCardResponse,
  InsightKpiResponse,
  InsightRequest,
  InsightResponse,
} from '../types';

export const insightOnboardingApi = api.enhanceEndpoints({ addTagTypes: ['insight-Onboarding'] }).injectEndpoints({
  endpoints: (builder) => ({
    getInsightOnboarding: builder.query<InsightResponse, InsightRequest>({
      query: () => ({
        url: getInsightUrl(),
        method: 'GET',
      }),

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['insight-onboarding'],
    }),
    getInsightOnboardingKpiColumnCard: builder.query<InsightKpiColumnCardResponse, InsightRequest>({
      query: () => ({
        url: getInsightOnboardingKpiColumnCardUrl(),
        method: 'GET',
      }),
    }),
    getInsightOnboardingKpi: builder.query<InsightKpiResponse, InsightRequest>({
      query: () => ({
        url: getInsightOnboardingKpiUrl(),
        method: 'GET',
      }),
    }),
    getInsightOnboardingHistogram: builder.query<InsightHistogramResponse, InsightRequest>({
      query: () => ({
        url: getInsightOnboardingHistogramUrl(),
        method: 'GET',
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
  useLazyGetInsightOnboardingHistogramQuery,
} = insightOnboardingApi;
