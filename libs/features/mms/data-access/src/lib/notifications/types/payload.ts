import { CreateNotificationRequestProps, NotificationProps, UpdateNotificationRequestProps } from './base';
import { ApiResponse, PaginationRequest } from '../../types';

export type NotificationListRequest = PaginationRequest;

export type NotificationListResponse = ApiResponse<NotificationProps[]>;

export type NotificationDetailResponse = ApiResponse<NotificationProps>;

export type CreateNotificationRequest = CreateNotificationRequestProps;

export type CreateNotificationResponse = ApiResponse<NotificationProps>;

export type UpdateNotificationRequest = UpdateNotificationRequestProps;

export type UpdateNotificationResponse = ApiResponse<NotificationProps>;

export type SendNotificationResponse = ApiResponse<NotificationProps>;
