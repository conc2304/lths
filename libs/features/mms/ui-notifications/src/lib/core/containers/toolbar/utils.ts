import { NotificationProps, UpdateNotificationRequestProps } from '@lths/features/mms/data-access';

import { ToolbarProps } from './types';

export const getInitialValues = (data: NotificationProps): ToolbarProps => {
  if (data) {
    const { headline, content, notification } = data;

    return {
      headline: headline || '',
      content: content || '',
      notification_link: notification?.outside_app ? 'outside' : 'inside',
      inside_app: notification?.inside_app || '',
      outside_app: notification?.outside_app || '',
    };
  } else {
    return {
      headline: '',
      content: '',
      notification_link: 'inside',
      inside_app: '',
      outside_app: '',
    };
  }
};

export const transformRequest = (data: UpdateNotificationRequestProps) => {
  const { _id, name, description, type, topics, headline, content, notification } = data;
  return {
    _id,
    name,
    description,
    type,
    topics,
    headline,
    content,
    notification,
  };
};
