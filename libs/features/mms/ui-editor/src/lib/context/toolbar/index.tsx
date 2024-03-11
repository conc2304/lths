import { createContext, useContext, useState, ReactNode } from 'react';
export type ToolbarType = Record<string, any>;
type ToolbarContextType = {
  data: ToolbarType;
  setData: (data: ToolbarType) => void;

  setValue: <T>(key: string, value: T) => ToolbarType;
  getValue: <T>(key: string, defaultValue: T) => T;
  removeValue: (key: string) => ToolbarType;
};

const ToolbarContext = createContext<ToolbarContextType | undefined>(undefined);

type ToolbarContextProviderProps = {
  children: ReactNode;
  initialValue: ToolbarType;
};

export function ToolbarContextProvider({ children, initialValue = {} }: ToolbarContextProviderProps) {
  const [data, setData] = useState<ToolbarType>(initialValue);
  const getValue = <T,>(key: string, defaultValue: T): T => {
    const value = data[key];
    if (value === undefined) {
      return defaultValue;
    }

    return value as T;
  };
  const setValue = <T,>(key: string, value: T): ToolbarType => {
    const newData = data ? { ...data, [key]: value } : { [key]: value };
    setData(newData);
    return newData;
  };

  const removeValue = (key: string) => {
    const newData = { ...data };
    delete newData[key];
    setData(newData);
    return newData;
  };

  return (
    <ToolbarContext.Provider value={{ data, setData, getValue, removeValue, setValue }}>
      {children}
    </ToolbarContext.Provider>
  );
}

export function useToolbarContext() {
  const context = useContext(ToolbarContext);
  if (context === undefined) {
    throw new Error('useToolbarContext must be used within a ToolbarContextProvider');
  }
  return context;
}
