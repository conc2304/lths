import { Dispatch } from 'react';

import { NotificationProps } from '@lths/features/mms/data-access';

import { EditorActionProps, EditorActionType, NotificationAction } from './types';

export const initEditor = (dispatch: Dispatch<EditorActionProps>) => (notification: NotificationProps) => {
  dispatch({ type: EditorActionType.INIT_NOTIFICATION, notification });
};

export const selectNotification = (dispatch: Dispatch<EditorActionProps>) => (notification: NotificationProps) => {
  dispatch({ type: EditorActionType.SET_CURRENT_NOTIFICATION, notification });
};

export const updateNotification =
  (dispatch: Dispatch<EditorActionProps>) => (payload: { key: keyof NotificationProps; value: string }) => {
    dispatch({ type: EditorActionType.UPDATE_NOTIFICATION, payload });
  };

export const openNotificationAlert = (dispatch: Dispatch<EditorActionProps>) => (alert: NotificationAction) => {
  dispatch({ type: EditorActionType.OPEN_NOTIFICATION_ALERT, alert });
};

export const closeNotificationAlert = (dispatch: Dispatch<EditorActionProps>) => () => {
  dispatch({ type: EditorActionType.CLOSE_NOTIFICATION_ALERT });
};

export const setFormSubmitting = (dispatch: Dispatch<EditorActionProps>) => (isSubmitting: boolean) => {
  dispatch({ type: EditorActionType.SET_FORM_SUBMITTING, isSubmitting });
};
