import { createContext, ReactNode, useContext, useReducer } from 'react';

import reducer from './reducer';
import { EditorContextProps, EditorProps } from './types';

type EditorProviderProps<T extends EditorProps = EditorProps> = { initialValue: T; children: ReactNode };

const EditorContext = createContext<EditorContextProps | null>(null);

const EditorProvider = <T extends EditorProps = EditorProps>({ initialValue, children }: EditorProviderProps<T>) => {
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
