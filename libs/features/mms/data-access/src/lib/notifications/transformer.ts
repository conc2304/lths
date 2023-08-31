import { convertISOStringToDateTimeFormat } from '@lths/shared/utils';

import { NotificationDetailResponse, NotificationListResponse } from './types';

export const transformNotificationListResponse = (response: NotificationListResponse) => {
  const payload = response.data;
  const transformedPayload = payload.map((item) => {
    const { sent_on } = item;
    const sent_on_formatted = sent_on ? convertISOStringToDateTimeFormat(sent_on) : null;
    return {
      ...item,
      sent_on_formatted,
    };
  });
  return {
    ...response,
    data: transformedPayload,
  };
};

export const transformNotificationDetailResponse = (response: NotificationDetailResponse) => {
  const payload = response.data;
  const { notification: { inside_app, outside_app } = {} } = payload;
  const transformedPayload = {
    ...payload,
    notification_link: outside_app ? 'outside' : 'inside',
    inside_app: inside_app,
    outside_app: outside_app,
  };
  return {
    ...response,
    data: transformedPayload,
  };
};
