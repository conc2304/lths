import { api } from '@lths/shared/data-access';

import { PagesHistogramResponse, PagesKpiResponse, PagesRequest, PagesResponse, PagesPreviewResponse } from '../types';
import {
  getInsightPagesKpiUrl,
  getInsightPagesUrl,
  getInsightPagesHistogramUrl,
  getInsightPagesPagePreviewUrl,
  getInsightPagesHistogram2Url,
} from '../urls';

export const insightPagesApi = api.enhanceEndpoints({ addTagTypes: ['insight-pages'] }).injectEndpoints({
  endpoints: (builder) => ({
    getInsightPages: builder.query<PagesResponse, PagesRequest>({
      query: () => ({
        url: getInsightPagesUrl(),
        method: 'GET',
      }),

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['insight-pages'],
    }),
    getInsightPagesKpi: builder.query<PagesKpiResponse, PagesRequest>({
      query: () => ({
        url: getInsightPagesKpiUrl(),
        method: 'GET',
      }),
    }),
    getInsightPagesHistogram: builder.query<PagesHistogramResponse, PagesRequest>({
      query: () => ({
        url: getInsightPagesHistogramUrl(),
        method: 'GET',
      }),
    }),
    getInsightPagesHistogram2: builder.query<PagesHistogramResponse, PagesRequest>({
      query: () => ({
        url: getInsightPagesHistogram2Url(),
        method: 'GET',
      }),
    }),
    getInsightPagesPreview: builder.query<PagesPreviewResponse, PagesRequest>({
      query: () => ({
        url: getInsightPagesPagePreviewUrl(),
        method: 'GET',
      }),
    }),
    //TODO need to add table
  }),
});

export const {
  useLazyGetInsightPagesHistogramQuery,
  useLazyGetInsightPagesHistogram2Query,
  useLazyGetInsightPagesKpiQuery,
  useLazyGetInsightPagesPreviewQuery,
  useGetInsightPagesQuery,
} = insightPagesApi;
