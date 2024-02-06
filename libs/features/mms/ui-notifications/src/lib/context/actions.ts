import { Dispatch } from 'react';

import { NotificationDataProps, NotificationProps } from '@lths/features/mms/data-access';

import { EditorActionProps, EditorActionType, NotificationAction } from './types';

export const selectNotification = (dispatch: Dispatch<EditorActionProps>) => (notification: NotificationProps) => {
  dispatch({ type: EditorActionType.SET_CURRENT_NOTIFICATION, notification });
};

export const updateNotificationData = (dispatch: Dispatch<EditorActionProps>) => (data: NotificationDataProps) => {
  dispatch({ type: EditorActionType.UPDATE_NOTIFICATION_DATA, data });
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

export const setEditorFormValid = (dispatch: Dispatch<EditorActionProps>) => (isEditorFormValid: boolean) => {
  dispatch({ type: EditorActionType.SET_EDITOR_FORM_VALID, isEditorFormValid });
};
