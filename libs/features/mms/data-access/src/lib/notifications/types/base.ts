export enum NotificationType {
  PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export type NotificationTyeProps = NotificationType;

export type PageLinkTarget = 'IN_APP' | 'BROWSER';

export type NotificationPayloadProps = {
  action: {
    page_id: string;
    page_link: {
      url: string;
      target: PageLinkTarget;
    };
  };
  image_url: string;
};

export type NotificationProps = {
  _id: string;
  name: string;
  description: string;
  headline: string;
  content: string;
  payload: Record<string, string>;
  type: NotificationTyeProps;
  topic: string[];
  notification: NotificationPayloadProps;
  status: string;
  created_on: string;
  updated_on: string;
  scheduled_sent_on: string;
  sent_on: string;
};

export type CreateNotificationRequestProps = {
  name: string;
  description: string;
  type: NotificationTyeProps;
  topic: string;
};

export type UpdateNotificationRequestProps = {
  notification_id: string;
  name: string;
  description: string;
  type: NotificationTyeProps;
  topics: string[];
  content: string;
};
