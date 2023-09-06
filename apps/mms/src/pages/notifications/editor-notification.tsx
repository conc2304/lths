import { useEffect } from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { EditorContainer, NotificationAction, useEditorActions } from '@lths-mui/features/mms/ui-notifications';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import {
  NotificationDataProps,
  useLazyGetNotificationDetailQuery,
  useUpdateNotificationMutation,
} from '@lths/features/mms/data-access';
import { useLayoutActions } from '@lths/shared/ui-layouts';

import ConnectedNotificationWrapper from './notification-wrapper';
import NotificationHeader from '../../components/notifications/editor/header';
import { NotificationStatus } from '../../components/notifications/editor/types';

const NotificationEditor = () => {
  //route params
  const { notificationId } = useParams();

  // api
  const {
    openNotificationAlert,
    selectNotification,
    selectedNotification,
    updateNotificationData,
    closeNotificationAlert,
  } = useEditorActions();
  const [getNotificationDetail, { isLoading }] = useLazyGetNotificationDetailQuery();
  const [updatenotification, { isLoading: isUpdating }] = useUpdateNotificationMutation();

  const { setPageTitle } = useLayoutActions();

  // fetch
  const fetchNotificationDetail = async (notificationId: string) => {
    try {
      const response = await getNotificationDetail(notificationId).unwrap();
      if (response.success) {
        const payload = response.data;
        if (payload) {
          selectNotification(payload);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in fetching the notification details', error);
      toast.error('Notification details could not be found');
    }
  };

  // fetch params
  const { name, status, data = {} } = selectedNotification || {};

  // update
  const handleUpdateNotification = async (data: NotificationDataProps) => {
    try {
      const { _id, name, type } = selectedNotification;
      const requestData = {
        _id,
        name,
        type,
        data,
      };
      const response = await updatenotification(requestData).unwrap();
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
  const handleStatusChange = (status: NotificationStatus) => {
    switch (status) {
      case NotificationStatus.SENT:
        openNotificationAlert(NotificationAction.PUSH);
        break;
    }
  };

  // handlers
  const handleActionClick = (action: NotificationAction) => {
    switch (action) {
      case NotificationAction.EDIT:
        openNotificationAlert(NotificationAction.EDIT);
        break;
      case NotificationAction.ARCHIVE:
        openNotificationAlert(NotificationAction.ARCHIVE);
        break;
      case NotificationAction.DUPLICATE:
        openNotificationAlert(NotificationAction.DUPLICATE);
        break;
      case NotificationAction.PREVIEW:
        console.log('Not implemented: preview');
        break;
      case NotificationAction.INSIGHTS:
        console.log('Not implemented: insights');
        break;
    }
  };

  const updateEditorState = (key: string, value: string, parentKey?: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (parentKey) {
      if (!newData[parentKey]) newData[parentKey] = {};
      newData[parentKey][key] = value;
    } else newData[key] = value;
    updateNotificationData(newData);
  };

  // side effects
  useEffect(() => {
    if (notificationId) fetchNotificationDetail(notificationId);
  }, [notificationId]);

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
        notificationData={data}
        onUpdateNotification={handleUpdateNotification}
        updateEditorState={updateEditorState}
        isUpdating={isUpdating}
      />
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

const WrappedNotificationEditor = () => {
  return (
    <ConnectedNotificationWrapper>
      <NotificationEditor />
    </ConnectedNotificationWrapper>
  );
};

export default WrappedNotificationEditor;
