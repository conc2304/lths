import { useMemo } from 'react';

import {
  initEditor,
  selectNotification,
  updateNotification,
  openNotificationAlert,
  closeNotificationAlert,
  setFormSubmitting,
} from './actions';
import { useEditor } from './context';

export const useEditorActions = () => {
  const { state, dispatch } = useEditor();

  /*
   * NOTE: useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
   * Memo is used instead of useCallback to avoid lint error here
   */

  return {
    initEditor: useMemo(() => initEditor(dispatch), [dispatch]),
    selectNotification: useMemo(() => selectNotification(dispatch), [dispatch]),
    updateNotification: useMemo(() => updateNotification(dispatch), [dispatch]),
    openNotificationAlert: useMemo(() => openNotificationAlert(dispatch), [dispatch]),
    closeNotificationAlert: useMemo(() => closeNotificationAlert(dispatch), [dispatch]),
    setFormSubmitting: useMemo(() => setFormSubmitting(dispatch), [dispatch]),
    selectedNotification: state.selectedNotification,
    isAlertOpen: state.isAlertOpen,
  };
};
