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
  duplicateComponent,
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
    clearEditor: useMemo(() => clearEditor(dispatch), [dispatch]),
    selectComponent: useMemo(() => selectComponent(dispatch), [dispatch]),
    clearSelectedComponent: useMemo(() => clearSelectedComponent(dispatch), [dispatch]),
    addComponent: useMemo(() => addComponent(dispatch), [dispatch]),
    updateComponent: useMemo(() => updateComponent(dispatch), [dispatch]),
    removeComponent: useMemo(() => removeComponent(dispatch), [dispatch]),
    duplicateComponent: useMemo(() => duplicateComponent(dispatch), [dispatch]),
    orderComponent: useMemo(() => orderComponent(dispatch), [dispatch]),
    ...state,
  };
};
