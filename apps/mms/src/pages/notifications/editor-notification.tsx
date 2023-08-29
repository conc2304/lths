import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { EditorContainer } from '@lths-mui/features/mms/ui-notifications';
import { useNavigate, useParams } from 'react-router-dom';

import { NotificationProps, useLazyGetNotificationDetailQuery } from '@lths/features/mms/data-access';

import CreateNotificationModal from '../../components/notifications/create-notification-modal';
import NotificationHeader from '../../components/notifications/editor/header';
import { NotificationActions } from '../../components/notifications/editor/types';
import ArchiveAlert from '../../components/notifications/modals/archive-alert';
import DuplicateAlert from '../../components/notifications/modals/duplicate-alert';
import SendAlert from '../../components/notifications/modals/send-alert';

const NotificationEditor = () => {
  const { notificationId } = useParams();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSendAlertOpen, setIsSendAlertOpen] = useState(false);
  const [isArchiveAlertOpen, setIsArchiveAlertOpen] = useState(false);
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false);

  const [editorState, setEditorState] = useState<NotificationProps>(null);
  const closeModal = () => setIsUpdateModalOpen(false);

  const navigate = useNavigate();

  const [getNotificationDetail] = useLazyGetNotificationDetailQuery();

  const fetchNotificationDetail = async (notificationId: string) => {
    console.log('fetching', notificationId);
    const response = await getNotificationDetail(notificationId).unwrap();
    console.log('detail response', response);
    // if (!response.success) {
    const payload = response.data;
    if (payload) setEditorState(payload);
    //   else toast.success('Page details could not be found');
    // }
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

  const handleSendNotification = () => {
    console.log('handling send notification...');
  };

  const handleArchiveAlertClose = () => {
    setIsArchiveAlertOpen(false);
  };

  const handleArchiveNotification = () => {
    console.log('handling archive notification...');
  };

  const handleDuplicateAlertClose = () => {
    setIsDuplicateAlertOpen(false);
  };

  const handleDuplicateNotification = () => {
    console.log('handling duplicate notification...');
  };

  useEffect(() => {
    if (notificationId) fetchNotificationDetail(notificationId);
  }, [notificationId]);

  const { name, status } = editorState || {};

  return (
    <Box sx={{ width: '100%' }}>
      <NotificationHeader
        title={name}
        status={status}
        onStatusChange={() => console.log('handling status change')}
        onActionClick={handleActionClick}
      />
      <EditorContainer notificationData={editorState} />
      <CreateNotificationModal
        open={isUpdateModalOpen}
        handleCloseModal={closeModal}
        onCreateNotification={(notification_id) => navigate(`/notifications/editor/${notification_id}`)}
        isEdit
        notificationData={editorState}
      />
      <SendAlert isOpen={isSendAlertOpen} handleClose={handleSendAlertClose} handleSend={handleSendNotification} />
      <ArchiveAlert
        isOpen={isArchiveAlertOpen}
        handleClose={handleArchiveAlertClose}
        handleSend={handleArchiveNotification}
      />
      <DuplicateAlert
        isOpen={isDuplicateAlertOpen}
        handleClose={handleDuplicateAlertClose}
        handleSend={handleDuplicateNotification}
      />
    </Box>
  );
};

export default NotificationEditor;
