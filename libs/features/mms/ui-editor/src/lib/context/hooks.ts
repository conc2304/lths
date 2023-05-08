import { useMemo } from 'react';

import {
  initEditor,
  clearEditor,
  selectComponent,
  addComponent,
  updateComponent,
  removeComponent,
  orderComponent,
  clearSelectedComponent,
} from './actions';
import { useEditor } from './context';
/*
* useLayoutActions is a custom React Hook that returns an object containing functions to update the layout state. 
* These functions use the useLayoutContext hook internally to access the layout context and dispatch actions to 
* update the layout state.

NOTE: Passing functions as values in a context is generally not considered a good idea because 
it can lead to unnecessary re-renders of components. This happens because when the function value 
is passed down as a prop through the context provider, it creates a new reference every time the component renders. 
This new reference is then passed down to all child components that use the context, causing them to re-render even if the 
actual value of the function hasn't changed.
*/
export const useEditorActions = () => {
  const { state, dispatch } = useEditor();
  //useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Memo is used instead of useCallback to avoid lint error

  return {
    initEditor: useMemo(() => initEditor(dispatch), [dispatch]),
    clearEditor: useMemo(() => clearEditor(dispatch), [dispatch]),
    selectComponent: useMemo(() => selectComponent(dispatch), [dispatch]),
    clearSelectedComponent: useMemo(() => clearSelectedComponent(dispatch), [dispatch]),
    addComponent: useMemo(() => addComponent(dispatch), [dispatch]),
    updateComponent: useMemo(() => updateComponent(dispatch), [dispatch]),
    removeComponent: useMemo(() => removeComponent(dispatch), [dispatch]),
    orderComponent: useMemo(() => orderComponent(dispatch), [dispatch]),
    ...state,
  };
};
