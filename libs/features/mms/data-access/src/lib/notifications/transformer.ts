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
  const { data } = payload;
  const { target: { type = 'native' } = {} } = data || {};
  const transformedPayload = {
    ...payload,
    data: {
      ...data,
      target: {
        ...data.target,
        type,
      },
    },
  };
  return {
    ...response,
    data: transformedPayload,
  };
};
