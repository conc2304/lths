import { Dialog, DialogTitle, Typography } from '@mui/material';

import { CloseIconButton } from '../../../common';
import { NotificationForm } from '../../forms';
import { CreateNotificationModalProps } from '../../types';

const CreateNotificationModal = (props: CreateNotificationModalProps) => {
  const { open, onCreateNotification, handleCloseModal, notificationTopics, isLoading, setFormSubmitting } = props;

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography component="p" variant="h2">
          Create notification
        </Typography>
        <Typography variant="body2">All text fields required unless noted.</Typography>
        <CloseIconButton onClick={handleCloseModal} />
      </DialogTitle>
      <NotificationForm
        onSubmit={onCreateNotification}
        onCancel={handleCloseModal}
        notificationTopics={notificationTopics}
        isLoading={isLoading}
        setFormSubmitting={setFormSubmitting}
        confirmButtonText="CREATE"
      />
    </Dialog>
  );
};

export default CreateNotificationModal;
