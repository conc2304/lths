export enum NotificationType {
  PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export type NotificationTyeProps = NotificationType;

export type PageLinkTarget = 'IN_APP' | 'BROWSER';

export type NotificationPayloadProps = {
  inside_app: string;
  outside_app: string;
  image_url?: string;
};

export type NotificationProps = {
  _id: string;
  name: string;
  description: string;
  headline?: string;
  content?: string;
  payload?: Record<string, string>;
  type: NotificationTyeProps;
  topics: string[];
  notification?: NotificationPayloadProps;
  status?: string;
  created_on?: string;
  updated_on?: string;
  scheduled_sent_on?: string;
  sent_on?: string;
  __v: number;
};

export type CreateNotificationRequestProps = {
  name: string;
  description?: string;
  type: NotificationTyeProps;
  topics: string[];
};

export type UpdateNotificationRequestProps = {
  _id: string;
  name: string;
  description: string;
  type: NotificationTyeProps;
  topics: string[];
  headline?: string;
  content?: string;
  notification?: NotificationPayloadProps;
};
