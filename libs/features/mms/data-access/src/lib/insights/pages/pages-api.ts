import { api } from '@lths/shared/data-access';
import { FilterSettingsQueryParams } from '@lths/shared/ui-elements';

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
    getInsightPagesKpi: builder.query<PagesKpiResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightPagesKpiUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightPagesHistogram: builder.query<PagesHistogramResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightPagesHistogramUrl(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightPagesHistogram2: builder.query<PagesHistogramResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightPagesHistogram2Url(),
        method: 'GET',
        params: queryStringParams,
      }),
    }),
    getInsightPagesPreview: builder.query<PagesPreviewResponse, FilterSettingsQueryParams>({
      query: (queryStringParams) => ({
        url: getInsightPagesPagePreviewUrl(),
        method: 'GET',
        params: queryStringParams,
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
