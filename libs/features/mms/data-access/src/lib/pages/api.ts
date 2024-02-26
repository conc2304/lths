import { api } from '@lths/shared/data-access';

import { transformComponentDetailResponse, transformPageListResponse } from './transformer';
import {
  ComponentDetailResponse,
  ComponentListResponse,
  CreatePageRequest,
  CreatePageResponse,
  EventListResponse,
  UpdatePageStatusRequest,
  DeletePageRequest,
  EnumListResponse,
  ComponentsListRequest,
  LocationListResponse,
  UserSegmentListResponse,
  PageDetailResponse,
  UpdatePageDetailRequest,
  UpdatePageDetailResponse,
  DuplicatePageDetailResponse,
  DuplicatePageDetailRequest,
  PageItemsResponse,
  PageItemsRequest,
  DeletePageResponse,
  UpdatePageStatusResponse,
  UpdatePageNameRequest,
} from './types';
import {
  getEnumListUrl,
  getComponentDetailUrl,
  getComponentsListUrl,
  getCreatePageUrl,
  getDefaultPagesUrl,
  getPageDetailUrl,
  getUpcomingEvents,
  getUpatePageStatusUrl,
  getDeletePageUrl,
  getLocationsUrl,
  getUserSegmentsUrl,
  getUpdatePageDetailsUrl,
  getDuplicatePageUrl,
} from './urls';
import { getPagesUrl } from './urls';
//TOD: Typing is missing for few methods
const pageApi = api.enhanceEndpoints({ addTagTypes: ['pages-components', 'pages', 'page-details'] }).injectEndpoints({
  endpoints: (builder) => ({
    getComponentList: builder.query<ComponentListResponse, ComponentsListRequest>({
      query: (req) => ({
        url: getComponentsListUrl(req),
        method: 'GET',
      }),

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['pages-components'],
    }),
    getComponentDetail: builder.query<ComponentDetailResponse, string>({
      query: (id) => ({
        url: getComponentDetailUrl(id),
        method: 'GET',
      }),
      transformResponse: transformComponentDetailResponse,
    }),
    createPage: builder.mutation<CreatePageResponse, CreatePageRequest>({
      query: (data) => ({
        url: getCreatePageUrl(),
        method: 'POST',
        body: data,
      }),
    }),
    getPagesItems: builder.query<PageItemsResponse, PageItemsRequest>({
      query: (request) => ({
        url: getPagesUrl(request),
        method: 'GET',
      }),
      transformResponse: transformPageListResponse,
      providesTags: ['pages'],
    }),
    getDefaultPages: builder.query<PageItemsResponse, void>({
      query: () => ({
        url: getDefaultPagesUrl(),
        method: 'GET',
      }),
    }),

    getPageDetails: builder.query<PageDetailResponse, string>({
      query: (page_id) => ({
        url: getPageDetailUrl(page_id),
        method: 'GET',
      }),
      providesTags: ['page-details'],
    }),
    getEnumList: builder.query<EnumListResponse, string>({
      query: (enum_id) => ({
        url: getEnumListUrl(enum_id),
        method: 'GET',
      }),
    }),
    getLocations: builder.query<LocationListResponse, void>({
      query: () => ({
        url: getLocationsUrl(),
        method: 'GET',
      }),
    }),
    getUserSegments: builder.query<UserSegmentListResponse, void>({
      query: () => ({
        url: getUserSegmentsUrl(),
        method: 'GET',
      }),
    }),
    getUpcomingEvents: builder.query<EventListResponse, void>({
      query: () => ({
        url: getUpcomingEvents(),
        method: 'GET',
      }),
    }),
    updatePageStatus: builder.mutation<UpdatePageStatusResponse, UpdatePageStatusRequest>({
      query: (req) => ({
        url: getUpatePageStatusUrl(req),
        method: 'PATCH',
        body: {
          status: req.status,
        },
      }),
    }),
    updatePageDetails: builder.mutation<UpdatePageDetailResponse, UpdatePageDetailRequest>({
      query: (req) => ({
        url: getUpdatePageDetailsUrl(req.page_id),
        method: 'PATCH',
        body: req,
      }),
    }),
    updatePageName: builder.mutation<UpdatePageDetailResponse, UpdatePageNameRequest>({
      query: ({ page_id, ...req }) => ({
        url: getUpdatePageDetailsUrl(page_id),
        method: 'PATCH',
        body: req,
      }),
      invalidatesTags: ['pages', 'page-details'],
    }),
    deletePage: builder.mutation<DeletePageResponse, DeletePageRequest>({
      query: (req) => ({
        url: getDeletePageUrl(req),
        method: 'DELETE',
      }),
      invalidatesTags: ['pages'],
    }),
    duplicatePage: builder.mutation<DuplicatePageDetailResponse, DuplicatePageDetailRequest>({
      query: (req) => ({
        url: getDuplicatePageUrl(),
        method: 'POST',
        body: req,
      }),
    }),
  }),
});

export const {
  useLazyGetComponentListQuery,
  useLazyGetComponentDetailQuery,
  useCreatePageMutation,
  useLazyGetPagesItemsQuery,
  useLazyGetDefaultPagesQuery,
  useLazyGetPageDetailsQuery,
  useLazyGetEnumListQuery,
  useLazyGetLocationsQuery,
  useLazyGetUserSegmentsQuery,
  useLazyGetUpcomingEventsQuery,
  useUpdatePageStatusMutation,
  useUpdatePageDetailsMutation,
  useUpdatePageNameMutation,
  useDeletePageMutation,
  useDuplicatePageMutation,
} = pageApi;
export default pageApi;
