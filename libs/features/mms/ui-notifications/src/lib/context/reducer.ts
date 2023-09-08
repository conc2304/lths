import { EditorActionProps, EditorActionType, EditorProps } from './types';

const reducer = (state: EditorProps, action: EditorActionProps): EditorProps => {
  switch (action.type) {
    case EditorActionType.SET_CURRENT_NOTIFICATION: {
      const { notification } = action;
      return {
        ...state,
        selectedNotification: notification,
      };
    }
    case EditorActionType.CLEAR_CURRENT_NOTIFICATION: {
      return {
        ...state,
        selectedNotification: null,
      };
    }
    case EditorActionType.INIT_NOTIFICATION: {
      const { notification } = action;
      return {
        ...state,
        selectedNotification: notification,
      };
    }
    case EditorActionType.UPDATE_NOTIFICATION_DATA: {
      const { data } = action;

      const { selectedNotification } = state;

      return {
        ...state,
        selectedNotification: selectedNotification
          ? {
              ...selectedNotification,
              data: {
                ...data,
              },
            }
          : null,
      };
    }
    case EditorActionType.OPEN_NOTIFICATION_ALERT: {
      const { alert } = action;
      return {
        ...state,
        selectedAlert: alert,
      };
    }
    case EditorActionType.CLOSE_NOTIFICATION_ALERT: {
      return {
        ...state,
        selectedAlert: null,
      };
    }
    case EditorActionType.SET_FORM_SUBMITTING: {
      const { isSubmitting } = action;
      return {
        ...state,
        isSubmittingForm: isSubmitting,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
