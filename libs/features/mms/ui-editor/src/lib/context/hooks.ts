import { useMemo } from 'react';

import {
  initEditor,
  updateExtended,
  clearEditor,
  selectComponent,
  addComponent,
  updateComponent,
  removeComponent,
  orderComponent,
  clearSelectedComponent,
  duplicateComponent,
  renameComponent,
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
    updateExtended: useMemo(() => updateExtended(dispatch), [dispatch]),
    clearEditor: useMemo(() => clearEditor(dispatch), [dispatch]),
    selectComponent: useMemo(() => selectComponent(dispatch), [dispatch]),
    clearSelectedComponent: useMemo(() => clearSelectedComponent(dispatch), [dispatch]),
    addComponent: useMemo(() => addComponent(dispatch), [dispatch]),
    updateComponent: useMemo(() => updateComponent(dispatch), [dispatch]),
    removeComponent: useMemo(() => removeComponent(dispatch), [dispatch]),
    duplicateComponent: useMemo(() => duplicateComponent(dispatch), [dispatch]),
    orderComponent: useMemo(() => orderComponent(dispatch), [dispatch]),
    renameComponent: useMemo(() => renameComponent(dispatch), [dispatch]),
    lastSwap: state.lastSwap,
    components: state.components,
    selectedComponent: state.selectedComponent,
    hasUnsavedEdits: state.hasUnsavedEdits,
    data: state,
  };
};
