export enum NotificationType {
  PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export enum NotificationStatus {
  DRAFT = 'DRAFT',
  READY_TO_SEND = 'READY_TO_SEND',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export enum NotificationTargetType {
  NATIVE = 'native',
  WEB = 'web',
}

export type NotificationTyeProps = NotificationType;

export type PageLinkTarget = 'IN_APP' | 'BROWSER';

export type NotificationDataProps = {
  headline?: string;
  content?: string;
  topics?: string[];
  target?: {
    type: NotificationTargetType;
    page_id: string;
    url: string;
  };
};

export type NotificationProps = {
  _id: string;
  name: string;
  description?: string;
  payload?: Record<string, string>;
  type: NotificationTyeProps;
  data?: NotificationDataProps;
  status?: NotificationStatus;
  created_on?: string;
  updated_on?: string;
  scheduled_sent_on?: string;
  sent_on?: string;
  __v?: number;
};

export type CreateNotificationRequestProps = {
  name: string;
  description?: string;
  type: NotificationTyeProps;
  data?: {
    topics: string[];
  };
  status: NotificationStatus;
};

export type UpdateNotificationRequestProps = {
  _id: string;
  name: string;
  description?: string;
  type: NotificationTyeProps;
  data?: NotificationDataProps;
};

export type DuplicateNotificationRequestProps = {
  id: string;
};

export type SendNotificationRequestProps = {
  _id: string;
  status: NotificationStatus;
};
