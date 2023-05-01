import { createContext, ReactNode, useContext, useReducer } from 'react';

import { initEditor, clearEditor, selectComponent, addComponent, updateComponent, removeComponent } from './actions';
import reducer from './reducer';
import { EditorContextProps, initialState } from './types';

const EditorContext = createContext<EditorContextProps | null>(null);

const EditorContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = {
    initEditor: initEditor(dispatch),
    clearEditor: clearEditor(dispatch),
    selectComponent: selectComponent(dispatch),
    addComponent: addComponent(dispatch),
    updateComponent: updateComponent(dispatch),
    removeComponent: removeComponent(dispatch),
  };

  const value = { state, actions };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditor must be used within <EditorContext.Provider>...</EditorContext.Provider>');
  }

  return context;
};

export { EditorContextProvider, EditorContext, useEditor };
