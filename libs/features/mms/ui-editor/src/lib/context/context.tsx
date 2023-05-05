import { createContext, ReactNode, useContext, useReducer } from 'react';

import reducer from './reducer';
import { EditorContextProps, initialState } from './types';

const EditorContext = createContext<EditorContextProps | null>(null);

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
