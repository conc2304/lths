import { Dispatch } from 'react';

import { EditorActionProps, EditorActionType, ComponentProps } from './types';

export const initEditor = (dispatch: Dispatch<EditorActionProps>) => (components: ComponentProps[]) => {
  dispatch({ type: EditorActionType.INIT_COMPONENTS, components });
};

export const clearEditor = (dispatch: Dispatch<EditorActionProps>) => () => {
  dispatch({ type: EditorActionType.CLEAR_COMPONENTS });
};
export const selectComponent = (dispatch: Dispatch<EditorActionProps>) => (component: ComponentProps) => {
  dispatch({ type: EditorActionType.SET_CURRENT_COMPONENT, component });
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
export const orderComponent = (dispatch: Dispatch<EditorActionProps>) => (dragIndex: number, hoverIndex: number) => {
  dispatch({ type: EditorActionType.ORDER_COMPONENT, dragIndex, hoverIndex });
};
