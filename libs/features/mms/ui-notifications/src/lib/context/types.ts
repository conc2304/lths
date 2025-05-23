import { Dispatch } from 'react';

import { NotificationDataProps, NotificationProps } from '@lths/features/mms/data-access';

export enum NotificationAction {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  DUPLICATE = 'DUPLICATE',
  ARCHIVE = 'ARCHIVE',
  PREVIEW = 'PREVIEW',
  INSIGHTS = 'INSIGHTS',
  PUSH = 'PUSH',
}

export type EditorProps = {
  selectedNotification: NotificationProps;
  selectedAlert: NotificationAction | null;
  isSubmittingForm: boolean;
  isEditorFormValid: boolean;
};

export enum EditorActionType {
  SET_CURRENT_NOTIFICATION = 'SET_CURRENT_NOTIFICATION',
  CLEAR_CURRENT_NOTIFICATION = 'CLEAR_CURRENT_NOTIFICATION',
  UPDATE_NOTIFICATION_DATA = 'UPDATE_NOTIFICATION_DATA',
  OPEN_NOTIFICATION_ALERT = 'OPEN_NOTIFICATION_ALERT',
  CLOSE_NOTIFICATION_ALERT = 'CLOSE_NOTIFICATION_ALERT',
  SET_FORM_SUBMITTING = 'SET_FORM_SUBMITTING',
  SET_EDITOR_FORM_VALID = 'SET_EDITOR_FORM_VALID',
}

export type EditorActionProps =
  | { type: EditorActionType.SET_CURRENT_NOTIFICATION; notification: NotificationProps }
  | { type: EditorActionType.CLEAR_CURRENT_NOTIFICATION }
  | {
      type: EditorActionType.UPDATE_NOTIFICATION_DATA;
      data: NotificationDataProps;
    }
  | {
      type: EditorActionType.OPEN_NOTIFICATION_ALERT;
      alert: NotificationAction;
    }
  | { type: EditorActionType.CLOSE_NOTIFICATION_ALERT }
  | { type: EditorActionType.SET_FORM_SUBMITTING; isSubmitting: boolean }
  | { type: EditorActionType.SET_EDITOR_FORM_VALID; isEditorFormValid: boolean };

export type EditorContextProps = {
  state: EditorProps;
  dispatch: Dispatch<EditorActionProps>;
};
