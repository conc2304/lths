import { Dialog } from '@mui/material';

import { DialogTitle } from '@lths/shared/ui-elements';

import { NotificationForm } from '../../forms';
import { EditNotificationModalProps } from '../../types';

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
      <DialogTitle title="Edit notification" onClose={handleCloseModal} />
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
