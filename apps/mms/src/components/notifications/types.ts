export type CreateNotificationModalProps = {
  open: boolean;
  handleCloseModal: () => void;
  onCreateNotification: (notification_id: string) => void;
};
