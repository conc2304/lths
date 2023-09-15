import { createContext, ReactNode, useContext, useReducer } from 'react';

import reducer from './reducer';
import { EditorContextProps, EditorProps } from './types';

type EditorProviderProps = {
  initialValue: EditorProps;
  children: ReactNode;
};

const EditorContext = createContext<EditorContextProps | null>(null);

const EditorProvider = ({ initialValue, children }: EditorProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const value = { state, dispatch };
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within <EditorContext.Provider>...</EditorContext.Provider>');
  }

  return context;
};

export { EditorProvider, EditorContext, useEditor };
