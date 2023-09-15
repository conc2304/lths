import { createContext, useContext, useState } from 'react';

import { AlertContextProps, AlertProviderProps } from './types';

const AlertContext = createContext<AlertContextProps | null>(null);

export const AlertProvider = ({ children, initialState }: AlertProviderProps) => {
  const [data, setData] = useState(initialState);
  return <AlertContext.Provider value={{ data, setData }}>{children}</AlertContext.Provider>;
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error('useAlertContext must be used within <AlertContext.Provider>...</AlertContext.Provider>');
  return context;
};
