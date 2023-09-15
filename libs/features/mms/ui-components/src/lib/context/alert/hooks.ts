import { useAlertContext } from './context';

export const useAlertActions = () => {
  const {
    data: { selectedAlert, payload },
    setData,
  } = useAlertContext();
  const openAlert = (alert: string, payload: Record<string, string> = {}) => {
    setData({
      selectedAlert: alert,
      payload,
    });
  };
  const closeAlert = () => {
    setData({
      selectedAlert: null,
      payload: null,
    });
  };
  return {
    openAlert,
    closeAlert,
    selectedAlert,
    alertPayload: payload,
  };
};
