import { Dispatch } from 'react';

import { EditorActionProps, EditorActionType, ComponentProps, EditorProps } from './types';

export const initEditor =
  <T extends EditorProps = EditorProps>(dispatch: Dispatch<EditorActionProps>) =>
  (data: T) => {
    dispatch({ type: EditorActionType.INIT_COMPONENTS, data });
  };
export const updateExtended =
  <T extends EditorProps = EditorProps>(dispatch: Dispatch<EditorActionProps>) =>
  (data: Partial<T>) => {
    dispatch({ type: EditorActionType.UPDATE_EXTENDED, data });
  };

export const selectComponent = (dispatch: Dispatch<EditorActionProps>) => (component: ComponentProps) => {
  dispatch({ type: EditorActionType.SET_CURRENT_COMPONENT, component });
};
export const clearSelectedComponent = (dispatch: Dispatch<EditorActionProps>) => () => {
  dispatch({ type: EditorActionType.CLEAR_CURRENT_COMPONENT });
};
export const addComponent = (dispatch: Dispatch<EditorActionProps>) => (component: ComponentProps) => {
  dispatch({ type: EditorActionType.ADD_COMPONENT, component });
};
export const updateComponent = (dispatch: Dispatch<EditorActionProps>) => (component: ComponentProps) => {
  dispatch({ type: EditorActionType.UPDATE_COMPONENT, component });
};
export const removeComponent = (dispatch: Dispatch<EditorActionProps>) => (id: string) => {
  dispatch({ type: EditorActionType.REMOVE_COMPONENT, id });
};
export const duplicateComponent = (dispatch: Dispatch<EditorActionProps>) => (id: string) => {
  dispatch({ type: EditorActionType.DUPLICATE_COMPONENT, id });
};
export const orderComponent = (dispatch: Dispatch<EditorActionProps>) => (dragIndex: number, hoverIndex: number) => {
  dispatch({ type: EditorActionType.ORDER_COMPONENT, dragIndex, hoverIndex });
};
export const renameComponent = (dispatch: Dispatch<EditorActionProps>) => (id: string, name: string) => {
  dispatch({ type: EditorActionType.RENAME_COMPONENT, id, name });
};
export const clearEditor = (dispatch: Dispatch<EditorActionProps>) => () => {
  dispatch({ type: EditorActionType.CLEAR_COMPONENTS });
};
