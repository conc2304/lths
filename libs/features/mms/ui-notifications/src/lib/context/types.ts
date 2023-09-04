import { Dispatch } from 'react';

import { NotificationProps } from '@lths/features/mms/data-access';

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
  selectedNotification: NotificationProps | null;
  isAlertOpen: NotificationAction | null;
  isSubmittingForm: boolean;
};

export enum EditorActionType {
  INIT_NOTIFICATION = 'INIT_NOTIFICATION',
  SET_CURRENT_NOTIFICATION = 'SET_CURRENT_NOTIFICATION',
  CLEAR_CURRENT_NOTIFICATION = 'CLEAR_CURRENT_NOTIFICATION',
  UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION',
  OPEN_NOTIFICATION_ALERT = 'OPEN_NOTIFICATION_ALERT',
  CLOSE_NOTIFICATION_ALERT = 'CLOSE_NOTIFICATION_ALERT',
  SET_FORM_SUBMITTING = 'SET_FORM_SUBMITTING',
}

export type EditorActionProps =
  | { type: EditorActionType.INIT_NOTIFICATION; notification: NotificationProps }
  | { type: EditorActionType.SET_CURRENT_NOTIFICATION; notification: NotificationProps }
  | { type: EditorActionType.CLEAR_CURRENT_NOTIFICATION }
  | {
      type: EditorActionType.UPDATE_NOTIFICATION;
      payload: { key: keyof NotificationProps; value: string };
    }
  | {
      type: EditorActionType.OPEN_NOTIFICATION_ALERT;
      alert: NotificationAction;
    }
  | { type: EditorActionType.CLOSE_NOTIFICATION_ALERT }
  | { type: EditorActionType.SET_FORM_SUBMITTING; isSubmitting: boolean };

export type EditorContextProps = {
  state: EditorProps;
  dispatch: Dispatch<EditorActionProps>;
};
