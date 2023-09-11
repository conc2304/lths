import { EnumValue, NotificationProps, NotificationType } from '@lths/features/mms/data-access';

export type NotificationRequest = {
  name: string;
  topics: string;
  description?: string;
  type: NotificationType;
};

type ModifyNotificationModalProps = {
  open: boolean;
  handleCloseModal: () => void;
  isLoading: boolean;
  setFormSubmitting: (isSubmitting: boolean) => void;
  notificationTopics: EnumValue[];
};

export type CreateNotificationModalProps = ModifyNotificationModalProps & {
  onCreateNotification: (data: NotificationRequest) => void;
};

export type EditNotificationModalProps = ModifyNotificationModalProps & {
  onUpdateNotification: (data: NotificationRequest) => void;
  notificationData: NotificationProps;
};

export type NotificationFormProps = {
  notificationData?: NotificationProps;
  notificationTopics: EnumValue[];
  setFormSubmitting: (isSubmitting: boolean) => void;
  onSubmit: (values: NotificationRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
  confirmButtonText: string;
};

export enum NotificationStatus {
  DRAFT = 'DRAFT',
  READY_TO_SEND = 'READY_TO_SEND',
  SENT = 'SENT',
  FAILED = 'FAILED',
}
