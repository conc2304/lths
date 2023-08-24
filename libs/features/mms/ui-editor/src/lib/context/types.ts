import { Dispatch, ReactNode } from 'react';

export type ToolbarProps = {
  onPropChange: (propName: string, callback: (url: string) => void) => void;
};

export type ComponentProps = {
  __ui_id__: string; // need to be replaced with _id or component_id in all the places
  _id: string;
  component_id: string;
  name: string;
  description: string;

  image_url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties_data: Record<string, any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: { [key: string]: any };

  //TBD: remove these props
  //constraints: Array<Record<string, string>>;
  display_order: number;
  category?: string;
  variation_id: string;
};
export type EditorProviderProps = {
  children: ReactNode;
};

export type EditorProps = {
  components: ComponentProps[];
  selectedComponent?: ComponentProps | null;
};

export type EditorDispathProps = {
  initEditor: (components: ComponentProps[]) => void;
  clearEditor: () => void;
  selectComponent: (component: ComponentProps) => void;
  clearSelectedComponent: () => void;
  addComponent: (component: ComponentProps) => void;
  updateComponent: (component: ComponentProps) => void;
  removeComponent: (id: string) => void;
};

export type EditorContextProps<T extends EditorProps = EditorProps> = {
  state: T;
  dispatch: Dispatch<EditorActionProps<T>>;
};

export enum EditorActionType {
  SET_CURRENT_COMPONENT = 'SET_CURRENT_COMPONENT',
  CLEAR_CURRENT_COMPONENT = 'CLEAR_CURRENT_COMPONENT',
  ADD_COMPONENT = 'ADD_COMPONENT',
  INIT_COMPONENTS = 'INIT_COMPONENTS',
  CLEAR_COMPONENTS = 'CLEAR_COMPONENTS',
  REMOVE_COMPONENT = 'REMOVE_COMPONENT',
  UPDATE_COMPONENT = 'UPDATE_COMPONENT',
  ORDER_COMPONENT = 'ORDER_COMPONENT',
  DUPLICATE_COMPONENT = 'DUPLICATE_COMPONENT',
  UPDATE_EXTENDED = 'UPDATE_EXTENDED',
}

export const initialState2: EditorProps = {
  components: [],
  selectedComponent: null,
};

export type EditorActionProps<T extends EditorProps = EditorProps> =
  | { type: EditorActionType.INIT_COMPONENTS; data: T }
  | { type: EditorActionType.UPDATE_EXTENDED; data: Partial<T> }
  | { type: EditorActionType.SET_CURRENT_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.CLEAR_CURRENT_COMPONENT }
  | { type: EditorActionType.ADD_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.UPDATE_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.CLEAR_COMPONENTS }
  | { type: EditorActionType.REMOVE_COMPONENT; id: string }
  | { type: EditorActionType.DUPLICATE_COMPONENT; id: string }
  | { type: EditorActionType.ORDER_COMPONENT; dragIndex: number; hoverIndex: number };
