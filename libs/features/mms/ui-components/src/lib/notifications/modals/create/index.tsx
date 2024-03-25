import { Dialog } from '@mui/material';

import { DialogTitle } from '@lths/shared/ui-elements';

import { NotificationForm } from '../../forms';
import { CreateNotificationModalProps } from '../../types';

const CreateNotificationModal = (props: CreateNotificationModalProps) => {
  const { open, onCreateNotification, handleCloseModal, notificationTopics, isLoading, setFormSubmitting } = props;

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle title="Create notification" onClose={handleCloseModal} />
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
