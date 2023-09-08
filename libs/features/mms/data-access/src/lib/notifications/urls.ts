import { NotificationListRequest } from './types';
import { PaginationRequest } from '../types';
import { addQueryParams } from '../utils';

const BASE_URL = '/mms/notifications';

export const getNotificationItemsUrl = (req: PaginationRequest) => {
  return addQueryParams(`/notifications-items`, req);
};

export const getNotificationsListUrl = (req: NotificationListRequest) => {
  return addQueryParams(BASE_URL, req);
};

export const getNotificationDetailUrl = (notification_id: string) => `${BASE_URL}/${notification_id}`;

export const getCreateNotificationUrl = () => BASE_URL;

export const getUpdateNotificationUrl = (notification_id: string) => `${BASE_URL}/${notification_id}`;

export const getDuplicateNotificationUrl = () => `${BASE_URL}/duplicate`;

export const getDeleteNotificationUrl = (notification_id: string) => `${BASE_URL}/${notification_id}`;
