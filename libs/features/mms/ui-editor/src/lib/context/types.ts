import { Dispatch, ReactNode } from 'react';

export type ComponentProps = {
  __ui_id__: string;
  component_id: string;
  component_name: string;
  component_type?: string;
  image_url?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default_data?: { [key: string]: any };
};

export type PageSettings = {
  name: string;
  default_page: string;
  page_id: string;
  description?: string;
  status: string;
};

export type EditorProviderProps = {
  children: ReactNode;
};

export type EditorProps = {
  components: ComponentProps[];
  selectedComponent: ComponentProps | null;
  settings: PageSettings;
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

export type EditorContextProps = { state: EditorProps; dispatch: Dispatch<EditorActionProps> };

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
  INIT_PAGE_SETTINGS = 'INIT_PAGE_SETTINGS',
}

export const initialState: EditorProps = {
  components: [],
  selectedComponent: null,
  settings: null,
};

export type EditorActionProps =
  | { type: EditorActionType.SET_CURRENT_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.CLEAR_CURRENT_COMPONENT }
  | { type: EditorActionType.ADD_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.UPDATE_COMPONENT; component: ComponentProps }
  | { type: EditorActionType.INIT_COMPONENTS; components: ComponentProps[] }
  | { type: EditorActionType.CLEAR_COMPONENTS }
  | { type: EditorActionType.REMOVE_COMPONENT; id: string }
  | { type: EditorActionType.DUPLICATE_COMPONENT; id: string }
  | { type: EditorActionType.ORDER_COMPONENT; dragIndex: number; hoverIndex: number }
  | { type: EditorActionType.INIT_PAGE_SETTINGS; settings: PageSettings };
