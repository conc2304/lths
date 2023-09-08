import { Dialog, DialogTitle, Typography } from '@mui/material';

import { NotificationForm } from '../../forms';
import { EditNotificationModalProps } from '../../types';
import CloseIconButton from '../close-icon-button';

const EditNotificationModal = (props: EditNotificationModalProps) => {
  const {
    open,
    handleCloseModal,
    onUpdateNotification,
    notificationData,
    notificationTopics,
    isLoading,
    setFormSubmitting,
  } = props;

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography component="p" variant="h2">
          Edit notification
        </Typography>
        <Typography variant="body2">All text fields required unless noted.</Typography>
        <CloseIconButton onClick={handleCloseModal} />
      </DialogTitle>
      <NotificationForm
        onSubmit={onUpdateNotification}
        onCancel={handleCloseModal}
        notificationData={notificationData}
        notificationTopics={notificationTopics}
        isLoading={isLoading}
        setFormSubmitting={setFormSubmitting}
        confirmButtonText="UPDATE"
      />
    </Dialog>
  );
};

export default EditNotificationModal;
