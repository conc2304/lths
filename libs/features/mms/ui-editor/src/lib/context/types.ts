import { Dispatch, ReactNode } from 'react';
export type Callback<T> = (value: T) => void;

export enum PageAction {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  RENAME = 'RENAME',
  DUPLICATE = 'DUPLICATE',
  DELETE = 'DELETE',
  PREVIEW = 'PREVIEW',
  COMPARISON = 'COMPARISON',
  INSIGHTS = 'INSIGHTS',
  PUSH = 'PUSH',
  SHARE = 'SHARE',
}

export type ToolbarProps = {
  onPropChange: <T>(propName: string, callback: Callback<T>, args?: unknown) => void;
};

export type ValidationErrorProps = Record<
  string,
  {
    message: string;
  }
>;

export type ComponentProps = {
  __ui_id__?: string; // need to be replaced with _id or component_id in all the places
  _id: string;
  component_id: string;
  name: string;
  description?: string;

  image_url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: { [key: string]: any };

  //TBD: remove these props
  display_order: number;
  category?: string;
  variation_id: string;
  errors?: ValidationErrorProps | null;
};
export type EditorProviderProps = {
  children: ReactNode;
};

export type Location = {
  _id: string;
  name: string;
  location: {
    type: string;
    lat: number;
    long: number;
    radius: number;
    unit: string;
    area_type: string;
  };
};

export type UserSegment = {
  _id: string;
  segment_id: string;
  name: string;
  description: string;
  properties: {
    type: string;
    value: string;
  };
  display_order?: number;
};
export type EventConstraint = Record<string, string | string[]>;

export type PageConstraints = {
  _id: string;
  events: EventConstraint[];
  locations: Location[];
  user_segments: UserSegment[];
};

export type EditorProps = {
  name?: string;
  description?: string;
  constraints?: PageConstraints;
  components: ComponentProps[];
  selectedComponent?: ComponentProps | null;
  hasUnsavedEdits?: boolean;
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
  RENAME_COMPONENT = 'RENAME_COMPONENT',
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
  | { type: EditorActionType.RENAME_COMPONENT; id: string; name: string }
  | { type: EditorActionType.ORDER_COMPONENT; dragIndex: number; hoverIndex: number };
