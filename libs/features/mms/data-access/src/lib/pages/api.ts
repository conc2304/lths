import { api } from '@lths/shared/data-access';

import { convertComponentDetailResponse } from './response-tranform';
import {
  ComponentDetailResponse,
  ComponentListResponse,
  CreatePageRequest,
  CreatePageResponse,
  EventListResponse,
  ImagesListResponse,
  PageDetailRequest,
  UpdatePageSettingsRequest,
  UpdatePageStatusRequest,
  DeletePageRequest,
  EnumListResponse,
  ComponentsListRequest,
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
  getSavePageConstraintsUrl,
  getUpatePageSettingsUrl,
  getUpcomingEvents,
  getUpatePageStatusUrl,
  getDeletePageUrl,
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

    getPageDetails: builder.query({
      query: (req: PageDetailRequest) => ({
        url: getPageDetailUrl(req),
        method: 'GET',
      }),
    }),
    savePageConstraints: builder.mutation({
      query: (req) => ({
        url: getSavePageConstraintsUrl(req),
        method: 'POST',
      }),
    }),
    updatePageSettings: builder.mutation({
      query: (req: UpdatePageSettingsRequest) => ({
        url: getUpatePageSettingsUrl(req),
        method: 'PATCH',
        body: req,
      }),
    }),
    getEnumList: builder.query<EnumListResponse, string>({
      query: (enum_id) => ({
        url: getEnumListUrl(enum_id),
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
  useSavePageConstraintsMutation,
  useUpdatePageSettingsMutation,
  useLazyGetEnumListQuery,
  useLazyGetUpcomingEventsQuery,
  useUpdatePageStatusMutation,
  useDeletePageMutation,
} = pageApi;
export default pageApi;
