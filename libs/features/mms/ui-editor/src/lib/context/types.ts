import { ReactNode } from 'react';

export type ComponentProps = {
  __ui_id__: string;
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;

  // Other properties for the component can be added here
};

export type EditorProviderProps = {
  children: ReactNode;
};

export type EditorProps = {
  components: ComponentProps[];
  selectedComponent: ComponentProps | null;
};
export type EditorDispathProps = {
  initEditor: (components: ComponentProps[]) => void;
  clearEditor: () => void;
  selectComponent: (component: ComponentProps) => void;
  addComponent: (component: ComponentProps) => void;
  updateComponent: (component: ComponentProps) => void;
  removeComponent: (id: string) => void;
};

export type EditorContextProps = { state: EditorProps; actions: EditorDispathProps };

export enum EditorActionType {
  SET_CURRENT_COMPONENT = 'SET_CURRENT_COMPONENT',
  ADD_COMPONENT = 'ADD_COMPONENT',
  INIT_COMPONENTS = 'INIT_COMPONENTS',
  CLEAR_COMPONENTS = 'CLEAR_COMPONENTS',
  REMOVE_COMPONENT = 'REMOVE_COMPONENT',
  UPDATE_COMPONENT = 'UPDATE_COMPONENT',
}

export const initialState: EditorProps = {
  components: [],
  selectedComponent: null,
};

export type EditorActionProps =
  | { type: EditorActionType.SET_CURRENT_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.ADD_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.UPDATE_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.INIT_COMPONENTS; components: ComponentProps[] }
  | { type: EditorActionType.CLEAR_COMPONENTS }
  | { type: EditorActionType.REMOVE_COMPONENT; id: string };
