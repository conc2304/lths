import { ReactNode } from 'react';
import { Box } from '@mui/material';
import {
  EditorProps,
  EditorProvider,
  NotificationAction,
  transformRequest,
  useEditorActions,
  useNotificationTopics,
} from '@lths-mui/features/mms/ui-notifications';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
  useArchiveNotificationMutation,
  useCreateNotificationMutation,
  useDuplicateNotificationMutation,
  useSendNotificationMutation,
  useUpdateNotificationMutation,
} from '@lths/features/mms/data-access';

import {
  ArchiveAlert,
  CreateNotificationModal,
  DuplicateAlert,
  EditNotificationModal,
  SendAlert,
} from '../../components/notifications/modals';
import { NotificationRequest } from '../../components/notifications/types';

type Props = {
  children: ReactNode;
};

const NotificationWrapper = ({ children }: Props) => {
  // route params
  const navigate = useNavigate();

  // custom hook calls
  const { notificationTopics } = useNotificationTopics();

  // api
  const { isAlertOpen, closeNotificationAlert, selectNotification, selectedNotification, setFormSubmitting } =
    useEditorActions();
  const [createNotification, { isLoading: isCreating }] = useCreateNotificationMutation();
  const [updateNotificationValues, { isLoading: isUpdating }] = useUpdateNotificationMutation();
  const [sendNotification, { isLoading: isSending }] = useSendNotificationMutation();
  const [duplicateNotification, { isLoading: isDuplicating }] = useDuplicateNotificationMutation();
  const [archiveNotification, { isLoading: isArchiving }] = useArchiveNotificationMutation();

  // mutation triggers
  const handleCreateNotification = async ({ name, description, topics, type }: NotificationRequest) => {
    try {
      const response = await createNotification({ name, description, topics: [topics], type }).unwrap();
      if (response.success) {
        toast.success('Notification has been created successfully.');
        const {
          data: { _id },
        } = response;
        navigate(`/notifications/editor/${_id}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in create the notification', error);
      toast.error('Failed to create the notification');
    }
  };

  const handleUpdateNotification = async ({ name, description, topics, type }: NotificationRequest) => {
    try {
      const requestData = transformRequest({
        _id: selectedNotification._id,
        name,
        description,
        type,
        topics: [topics],
      });
      const response = await updateNotificationValues(requestData).unwrap();
      if (response.success) {
        closeNotificationAlert();
        toast.success('Notification has been updated successfully.');
        if (response?.data) {
          selectNotification(response.data);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in updating the notification', error);
      toast.error('Failed to update the notification');
    }
  };

  const handleSendNotification = async () => {
    try {
      const requestData = transformRequest(selectedNotification);
      const response = await sendNotification(requestData).unwrap();
      if (response.success) {
        closeNotificationAlert();
        toast.success('Notification has been sent successfully');
        if (response.data) selectNotification(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in sending the notification', error);
      toast.error('Failed to send the notification');
    }
  };

  const handleArchiveNotification = async () => {
    try {
      const response = await archiveNotification(selectedNotification._id).unwrap();
      if (response.success) {
        closeNotificationAlert();
        toast.success('Notification has been archived successfully');
        if (response.data) navigate('/notifications');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in archiving the notification', error);
      toast.error('Failed to archive the notification');
    }
  };

  const handleDuplicateNotification = async () => {
    try {
      const response = await duplicateNotification({ id: selectedNotification._id }).unwrap();
      if (response.success) {
        closeNotificationAlert();
        toast.success('Notification has been duplicated successfully');
        if (response.data) navigate(`/notifications/editor/${response.data._id}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in duplicating the notification', error);
      toast.error('Failed to duplicate the notification');
    }
  };

  return (
    <Box>
      {children}
      <CreateNotificationModal
        open={isAlertOpen === NotificationAction.CREATE}
        handleCloseModal={closeNotificationAlert}
        notificationTopics={notificationTopics}
        onCreateNotification={handleCreateNotification}
        isLoading={isCreating}
        setFormSubmitting={setFormSubmitting}
      />
      <EditNotificationModal
        open={isAlertOpen === NotificationAction.EDIT}
        handleCloseModal={closeNotificationAlert}
        notificationTopics={notificationTopics}
        onUpdateNotification={handleUpdateNotification}
        isLoading={isUpdating}
        setFormSubmitting={setFormSubmitting}
        notificationData={selectedNotification}
      />
      <SendAlert
        isLoading={isSending}
        isOpen={isAlertOpen === NotificationAction.PUSH}
        handleClose={closeNotificationAlert}
        handleSend={handleSendNotification}
      />
      <ArchiveAlert
        isLoading={isArchiving}
        isOpen={isAlertOpen === NotificationAction.ARCHIVE}
        handleClose={closeNotificationAlert}
        handleArchive={handleArchiveNotification}
      />
      <DuplicateAlert
        isLoading={isDuplicating}
        isOpen={isAlertOpen === NotificationAction.DUPLICATE}
        handleClose={closeNotificationAlert}
        handleDuplicate={handleDuplicateNotification}
      />
    </Box>
  );
};

const ConnectedNotificationWrapper = ({ children }: Props) => {
  const initialState: EditorProps = {
    selectedNotification: null,
    isAlertOpen: null,
    isSubmittingForm: false,
  };

  return (
    <EditorProvider initialValue={initialState}>
      <NotificationWrapper>{children}</NotificationWrapper>
    </EditorProvider>
  );
};

export default ConnectedNotificationWrapper;
