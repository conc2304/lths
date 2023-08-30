import { useState, useEffect } from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { EditorContainer, transformRequest } from '@lths-mui/features/mms/ui-notifications';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  NotificationProps,
  UpdateNotificationRequestProps,
  useArchiveNotificationMutation,
  useDuplicateNotificationMutation,
  useLazyGetNotificationDetailQuery,
  useSendNotificationMutation,
  useUpdateNotificationMutation,
} from '@lths/features/mms/data-access';
import { useLayoutActions } from '@lths/shared/ui-layouts';

import NotificationHeader from '../../components/notifications/editor/header';
import { NotificationActions, NotificationStatus } from '../../components/notifications/editor/types';
import {
  ArchiveAlert,
  CreateNotificationModal,
  DuplicateAlert,
  SendAlert,
} from '../../components/notifications/modals';

const NotificationEditor = () => {
  const { notificationId } = useParams();

  const navigate = useNavigate();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSendAlertOpen, setIsSendAlertOpen] = useState(false);
  const [isArchiveAlertOpen, setIsArchiveAlertOpen] = useState(false);
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false);

  const [editorState, setEditorState] = useState<NotificationProps>(null);
  const closeModal = () => setIsUpdateModalOpen(false);

  const [getNotificationDetail, { isLoading }] = useLazyGetNotificationDetailQuery();

  const [updateNotification, { isLoading: isUpdating }] = useUpdateNotificationMutation();

  const [sendNotification, { isLoading: isSending }] = useSendNotificationMutation();

  const [duplicateNotification, { isLoading: isDuplicating }] = useDuplicateNotificationMutation();

  const [archiveNotification, { isLoading: isArchiving }] = useArchiveNotificationMutation();

  const { setPageTitle } = useLayoutActions();

  const fetchNotificationDetail = async (notificationId: string) => {
    const response = await getNotificationDetail(notificationId).unwrap();
    if (response.success) {
      const payload = response.data;
      if (payload) setEditorState(payload);
    } else toast.error('Page details could not be found');
  };

  const handleActionClick = (action: NotificationActions) => {
    switch (action) {
      case NotificationActions.EDIT:
        setIsUpdateModalOpen(true);
        break;
      case NotificationActions.ARCHIVE:
        setIsArchiveAlertOpen(true);
        break;
      case NotificationActions.DUPLICATE:
        setIsDuplicateAlertOpen(true);
        break;
      case NotificationActions.PREVIEW:
        console.log('Not implemented: preview');
        break;
      case NotificationActions.INSIGHTS:
        console.log('Not implemented: insights');
        break;
    }
  };

  const handleSendAlertClose = () => {
    setIsSendAlertOpen(false);
  };

  const handleSendNotification = async () => {
    const requestData = transformRequest(editorState);
    const response = await sendNotification(requestData).unwrap();
    if (response.success) {
      setIsSendAlertOpen(false);
      toast.success('Notification has been sent successfully');
      if (response.data) setEditorState(response.data);
    } else {
      toast.error('Failed to send the notification');
    }
  };

  const handleArchiveAlertClose = () => {
    setIsArchiveAlertOpen(false);
  };

  const handleArchiveNotification = async () => {
    const response = await archiveNotification(notificationId).unwrap();
    if (response.success) {
      setIsArchiveAlertOpen(false);
      toast.success('Notification has been archived successfully');
      if (response.data) navigate('/notifications');
    } else {
      toast.error('Failed to archive the notification');
    }
  };

  const handleDuplicateAlertClose = () => {
    setIsDuplicateAlertOpen(false);
  };

  const handleDuplicateNotification = async () => {
    const response = await duplicateNotification(notificationId).unwrap();
    if (response.success) {
      setIsDuplicateAlertOpen(false);
      toast.success('Notification has been duplicated successfully');
      if (response.data) navigate(`/notifications/editor/${response.data._id}`);
    } else {
      toast.error('Failed to duplicate the notification');
    }
  };

  const updateEditorState = (key: string, value: string, parent_key: string) => {
    let updatedData: Record<string, any> = { [key]: value };

    if (parent_key) updatedData = { [parent_key]: updatedData };

    setEditorState((prevState) => ({
      ...prevState,
      ...updatedData,
    }));
  };

  const handleUpdateNotification = async (data: UpdateNotificationRequestProps) => {
    const requestData = transformRequest(data);
    const response = await updateNotification(requestData).unwrap();
    if (response.success) {
      setIsUpdateModalOpen(false);
      toast.success('Notification has been updated successfully.');
      if (response?.data) setEditorState(response?.data);
    }
  };

  const handleStatusChange = (status: NotificationStatus) => {
    switch (status) {
      case NotificationStatus.SENT:
        setIsSendAlertOpen(true);
        break;
    }
  };

  useEffect(() => {
    if (notificationId) fetchNotificationDetail(notificationId);
  }, [notificationId]);

  const { name, status } = editorState || {};

  useEffect(() => {
    if (name) setPageTitle(name);
  }, [name]);

  return (
    <Box sx={{ width: '100%' }}>
      <NotificationHeader
        title={name}
        status={status}
        onStatusChange={handleStatusChange}
        onActionClick={handleActionClick}
      />
      <EditorContainer
        notificationData={editorState}
        onUpdateNotification={handleUpdateNotification}
        updateEditorState={updateEditorState}
      />
      <CreateNotificationModal
        open={isUpdateModalOpen}
        handleCloseModal={closeModal}
        onCreateNotification={handleUpdateNotification}
        isEdit
        notificationData={editorState}
        isResponseLoading={isUpdating}
      />
      <SendAlert
        isLoading={isSending}
        isOpen={isSendAlertOpen}
        handleClose={handleSendAlertClose}
        handleSend={handleSendNotification}
      />
      <ArchiveAlert
        isLoading={isArchiving}
        isOpen={isArchiveAlertOpen}
        handleClose={handleArchiveAlertClose}
        handleArchive={handleArchiveNotification}
      />
      <DuplicateAlert
        isLoading={isDuplicating}
        isOpen={isDuplicateAlertOpen}
        handleClose={handleDuplicateAlertClose}
        handleDuplicate={handleDuplicateNotification}
      />
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default NotificationEditor;
