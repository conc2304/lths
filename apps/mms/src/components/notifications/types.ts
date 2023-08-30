import { CreateNotificationRequestProps, NotificationProps, NotificationType } from '@lths/features/mms/data-access';

export type CreateNotificationModalProps = {
  open: boolean;
  handleCloseModal: () => void;
  onCreateNotification: (data: CreateNotificationRequestProps) => void;
  isEdit?: boolean;
  notificationData?: NotificationProps;
  isResponseLoading?: boolean;
};

export type NewNotificationRequest = {
  _id?: string;
  name: string;
  topics: string;
  description?: string;
  type: NotificationType;
};
