import { NotificationListRequest } from './types';
import { PaginationRequest } from '../types';

const NOTIFICATION_BASE_URL = '/mms/notifications';

export const getNotificationItemsUrl = (req: PaginationRequest) => {
  const params = [];
  const { page = 0, page_size, sort_key, sort_order } = req;
  if (page != null) params.push(`page=${page}`);
  if (page_size != null) params.push(`page_size=${page_size}`);
  if (sort_key != null) params.push(`sort_key=${sort_key}`);
  if (sort_order != null) params.push(`page=${sort_order}`);

  return `/notifications-items?${params.join('&')}`;
};

export const getNotificationsListUrl = (req: NotificationListRequest) => {
  const params = [];
  const { page, page_size = 25, sort_key, sort_order } = req;
  if (page != null) params.push(`offset=${page * page_size}`);
  if (page_size != null) params.push(`limit=${page_size}`);
  if (sort_key != null) params.push(`sort_field=${sort_key}`);
  if (sort_order != null) params.push(`sort_by=${sort_order}`);

  return `${NOTIFICATION_BASE_URL}?${params.join('&')}`;
};

export const getNotificationDetailUrl = (notification_id: string) => `${NOTIFICATION_BASE_URL}/${notification_id}`;

export const getCreateNotificationUrl = () => NOTIFICATION_BASE_URL;

export const getUpdateNotificationUrl = (notification_id: string) => `${NOTIFICATION_BASE_URL}/${notification_id}`;

export const getSendNotificationUrl = (notification_id: string) =>
  `${NOTIFICATION_BASE_URL}/${notification_id}?send_now=true`;

export const getDuplicateNotificationUrl = () => `${NOTIFICATION_BASE_URL}/duplicate`;

export const getDeleteNotificationUrl = (notification_id: string) => `${NOTIFICATION_BASE_URL}/${notification_id}`;
