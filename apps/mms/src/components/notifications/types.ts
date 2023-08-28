import { NotificationProps } from '@lths/features/mms/data-access';

export type CreateNotificationModalProps = {
  open: boolean;
  handleCloseModal: () => void;
  onCreateNotification: (notification_id: string) => void;
  isEdit?: boolean;
  notificationData?: NotificationProps;
};
