import { ReactNode, Dispatch, SetStateAction } from 'react';

export type AlertData = {
  selectedAlert: string | null;
  payload: Record<string, string> | null;
};

export type AlertContextProps = {
  data: AlertData;
  setData: Dispatch<SetStateAction<AlertData>>;
};

export type AlertProviderProps = {
  children: ReactNode;
  initialState: AlertData;
};
