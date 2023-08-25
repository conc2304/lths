import { api } from '@lths/shared/data-access';

import {
  CreateNotificationRequest,
  CreateNotificationResponse,
  NotificationDetailResponse,
  NotificationListRequest,
  NotificationListResponse,
  SendNotificationResponse,
  UpdateNotificationRequest,
  UpdateNotificationResponse,
} from './types';
import {
  getCreateNotificationUrl,
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
        url: getUpdateNotificationUrl(req.notification_id),
        method: 'PATCH',
        body: req,
      }),
    }),
    sendNotification: builder.mutation<SendNotificationResponse, string>({
      query: (notification_id) => ({
        url: getSendNotificationUrl(notification_id),
        method: 'POST',
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
  useSendNotificationMutation,
} = notificationApi;

export default notificationApi;
