import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  NotificationStatus,
  NotificationType,
  useArchiveNotificationMutation,
  useCreateNotificationMutation,
  useDuplicateNotificationMutation,
  useSendNotificationMutation,
  useUpdateNotificationMutation,
} from '@lths/features/mms/data-access';
import {
  EditorProps,
  EditorProvider,
  NotificationAction,
  useEditorActions,
  useNotificationTopics,
} from '@lths/features/mms/ui-notifications';
import { toast } from '@lths/shared/ui-elements';

import { ArchiveAlert, DuplicateAlert, SendAlert } from '../dialogs';
import { CreateNotificationModal, EditNotificationModal } from '../modals';
import { NotificationRequest } from '../types';

type Props = {
  children: ReactNode;
};

const NotificationAdapter = ({ children }: Props) => {
  // route params
  const navigate = useNavigate();

  // custom hook calls
  const { notificationTopics } = useNotificationTopics();

  // api
  const { selectedAlert, closeNotificationAlert, selectNotification, selectedNotification, setFormSubmitting } =
    useEditorActions();
  const [createNotification, { isLoading: isCreating }] = useCreateNotificationMutation();
  const [updateNotification, { isLoading: isUpdating }] = useUpdateNotificationMutation();
  const [sendNotification, { isLoading: isSending }] = useSendNotificationMutation();
  const [duplicateNotification, { isLoading: isDuplicating }] = useDuplicateNotificationMutation();
  const [archiveNotification, { isLoading: isArchiving }] = useArchiveNotificationMutation();

  const { _id, type, data, status } = selectedNotification;

  // mutation triggers
  const handleCreateNotification = async ({ name, description, topics, type }: NotificationRequest) => {
    const requestData = {
      name,
      description,
      type,
      data: {
        topics: [topics],
      },
      status: NotificationStatus.DRAFT,
    };
    try {
      const response = await createNotification(requestData).unwrap();
      if (response.success) {
        toast.add('Notification has been created successfully.', { type: 'success' });
        const {
          data: { _id },
        } = response;
        navigate(`/notifications/editor/${_id}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in create the notification', error);
      toast.add('Failed to create the notification', { type: 'error' });
    }
  };

  const handleUpdateNotification = async ({ name, description, topics, type }: NotificationRequest) => {
    try {
      const requestData = {
        _id,
        name,
        description,
        type,
        data: {
          topics: [topics],
          ...data,
        },
        status,
      };
      const response = await updateNotification(requestData).unwrap();
      if (response.success) {
        closeNotificationAlert();
        toast.add('Notification has been updated successfully.', { type: 'success' });
        if (response?.data) {
          selectNotification(response.data);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in updating the notification', error);
      toast.add('Failed to update the notification', { type: 'error' });
    }
  };

  const handleSendNotification = async () => {
    try {
      const requestData = {
        _id,
        type,
        data,
        status: NotificationStatus.READY_TO_SEND,
      };
      const response = await sendNotification(requestData).unwrap();
      if (response.success) {
        closeNotificationAlert();
        toast.add('Notification has been sent successfully', { type: 'success' });
        if (response.data) navigate('/notifications');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in sending the notification', error);
      toast.add('Failed to send the notification', { type: 'error' });
    }
  };

  const handleArchiveNotification = async () => {
    try {
      const response = await archiveNotification(_id).unwrap();
      if (response.success) {
        closeNotificationAlert();
        toast.add('Notification has been archived successfully', { type: 'success' });
        if (response.data) navigate('/notifications');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in archiving the notification', error);
      toast.add('Failed to archive the notification', { type: 'error' });
    }
  };

  const handleDuplicateNotification = async () => {
    try {
      const response = await duplicateNotification({ id: _id }).unwrap();
      if (response.success) {
        closeNotificationAlert();
        toast.add('Notification has been duplicated successfully', { type: 'success' });
        if (response.data) navigate(`/notifications/editor/${response.data._id}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in duplicating the notification', error);
      toast.add('Failed to duplicate the notification', { type: 'error' });
    }
  };

  return (
    <Box>
      {children}
      <CreateNotificationModal
        open={selectedAlert === NotificationAction.CREATE}
        handleCloseModal={closeNotificationAlert}
        notificationTopics={notificationTopics}
        onCreateNotification={handleCreateNotification}
        isLoading={isCreating}
        setFormSubmitting={setFormSubmitting}
      />
      <EditNotificationModal
        open={selectedAlert === NotificationAction.EDIT}
        handleCloseModal={closeNotificationAlert}
        notificationTopics={notificationTopics}
        onUpdateNotification={handleUpdateNotification}
        isLoading={isUpdating}
        setFormSubmitting={setFormSubmitting}
        notificationData={selectedNotification}
      />
      <SendAlert
        isLoading={isSending}
        isOpen={selectedAlert === NotificationAction.PUSH}
        handleClose={closeNotificationAlert}
        handleSend={handleSendNotification}
      />
      <ArchiveAlert
        isLoading={isArchiving}
        isOpen={selectedAlert === NotificationAction.ARCHIVE}
        handleClose={closeNotificationAlert}
        handleArchive={handleArchiveNotification}
      />
      <DuplicateAlert
        isLoading={isDuplicating}
        isOpen={selectedAlert === NotificationAction.DUPLICATE}
        handleClose={closeNotificationAlert}
        handleDuplicate={handleDuplicateNotification}
      />
    </Box>
  );
};

export const NotificationAdapterProvider = ({ children }: Props) => {
  const initialState: EditorProps = {
    selectedNotification: {
      _id: '',
      name: '',
      type: NotificationType.PUSH_NOTIFICATION,
    },
    selectedAlert: null,
    isSubmittingForm: false,
    isEditorFormValid: false,
  };

  return (
    <EditorProvider initialValue={initialState}>
      <NotificationAdapter>{children}</NotificationAdapter>
    </EditorProvider>
  );
};
