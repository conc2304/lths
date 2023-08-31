import { NotificationProps } from '@lths/features/mms/data-access';

export const transformRequest = (data: NotificationProps) => {
  const { _id, name, description, type, topics, headline, content, notification_link, inside_app, outside_app } = data;
  return {
    _id,
    name,
    description,
    type,
    topics,
    headline,
    content,
    notification: {
      inside_app: notification_link === 'inside' ? inside_app : '',
      outside_app: notification_link === 'outside' ? outside_app : '',
    },
  };
};
