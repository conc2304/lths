import { api } from '@lths/shared/data-access';

import { convertComponentDetailResponse } from './response-tranform';
import {
  ComponentDetailResponse,
  ComponentListResponse,
  CreatePageRequest,
  CreatePageResponse,
  EventListResponse,
  ImagesListResponse,
  UpdatePageStatusRequest,
  DeletePageRequest,
  EnumListResponse,
  ComponentsListRequest,
  LocationListResponse,
  UserSegmentListResponse,
  PageDetailResponse,
  UpdatePageDetailRequest,
  UpdatePageDetailResponse,
} from './types';
import { PagesDataRequest } from './types';
import {
  getEnumListUrl,
  getComponentDetailUrl,
  getComponentsListUrl,
  getCreatePageUrl,
  getDefaultPagesUrl,
  getImagesListUrl,
  getPageDetailUrl,
  getUpcomingEvents,
  getUpatePageStatusUrl,
  getDeletePageUrl,
  getLocationsUrl,
  getUserSegmentsUrl,
  getUpdatePageDetailsUrl,
} from './urls';
import { getPagesUrl } from './urls';

const pageApi = api.enhanceEndpoints({ addTagTypes: ['pages-components'] }).injectEndpoints({
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
      transformResponse: (response: ComponentDetailResponse): ComponentDetailResponse => {
        const convertedResponse = convertComponentDetailResponse(response.data);
        return { data: convertedResponse };
      },
    }),
    getImagesList: builder.query<ImagesListResponse, void>({
      query: () => ({
        url: getImagesListUrl(),
        method: 'GET',
      }),
    }),
    createPage: builder.mutation<CreatePageResponse, CreatePageRequest>({
      query: (data) => ({
        url: getCreatePageUrl(),
        method: 'POST',
        body: data,
      }),
    }),
    getPagesItems: builder.query({
      query: (request: PagesDataRequest) => ({
        url: getPagesUrl(request),
        method: 'GET',
      }),
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['Pages'],
    }),
    getDefaultPages: builder.query({
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
    updatePageStatus: builder.mutation({
      query: (req: UpdatePageStatusRequest) => ({
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
    deletePage: builder.mutation({
      query: (req: DeletePageRequest) => ({
        url: getDeletePageUrl(req),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetComponentListQuery,
  useLazyGetComponentDetailQuery,
  useLazyGetImagesListQuery,
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
  useDeletePageMutation,
} = pageApi;
export default pageApi;
