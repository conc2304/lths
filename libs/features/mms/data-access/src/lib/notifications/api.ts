import { api } from '@lths/shared/data-access';

import { transformNotificationListResponse } from './transformer';
import {
  ArchiveNotificationResponse,
  CreateNotificationRequest,
  CreateNotificationResponse,
  DuplicateNotificationRequest,
  DuplicateNotificationResponse,
  NotificationDetailResponse,
  NotificationListRequest,
  NotificationListResponse,
  UpdateNotificationRequest,
  UpdateNotificationResponse,
} from './types';
import {
  getCreateNotificationUrl,
  getDeleteNotificationUrl,
  getDuplicateNotificationUrl,
  getNotificationDetailUrl,
  getNotificationItemsUrl,
  getNotificationsListUrl,
  getSendNotificationUrl,
  getUpdateNotificationUrl,
} from './urls';

const notificationApi = api.enhanceEndpoints({ addTagTypes: ['notifications'] }).injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsItems: builder.query({
      query: (req) => ({
        url: getNotificationItemsUrl(req),
        method: 'GET',
      }),
    }),
    getNotificationsList: builder.query<NotificationListResponse, NotificationListRequest>({
      query: (req) => ({
        url: getNotificationsListUrl(req),
        method: 'GET',
      }),
      transformResponse: transformNotificationListResponse,
    }),
    getNotificationDetail: builder.query<NotificationDetailResponse, string>({
      query: (notification_id) => ({
        url: getNotificationDetailUrl(notification_id),
        method: 'GET',
      }),
    }),
    createNotification: builder.mutation<CreateNotificationResponse, CreateNotificationRequest>({
      query: (req) => ({
        url: getCreateNotificationUrl(),
        method: 'POST',
        body: req,
      }),
    }),
    updateNotification: builder.mutation<UpdateNotificationResponse, UpdateNotificationRequest>({
      query: (req) => ({
        url: getUpdateNotificationUrl(req._id),
        method: 'PATCH',
        body: req,
      }),
    }),
    duplicateNotification: builder.mutation<DuplicateNotificationResponse, DuplicateNotificationRequest>({
      query: (req) => ({
        url: getDuplicateNotificationUrl(),
        method: 'POST',
        body: req,
      }),
    }),
    archiveNotification: builder.mutation<ArchiveNotificationResponse, string>({
      query: (notification_id) => ({
        url: getDeleteNotificationUrl(notification_id),
        method: 'DELETE',
      }),
    }),
    sendNotification: builder.mutation<DuplicateNotificationResponse, UpdateNotificationRequest>({
      query: (req) => ({
        url: getSendNotificationUrl(req._id),
        method: 'PATCH',
        body: req,
      }),
    }),
  }),
});

export const {
  useLazyGetNotificationsItemsQuery,
  useLazyGetNotificationsListQuery,
  useLazyGetNotificationDetailQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDuplicateNotificationMutation,
  useArchiveNotificationMutation,
  useSendNotificationMutation,
} = notificationApi;

export default notificationApi;
