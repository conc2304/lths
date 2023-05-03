import { Dispatch, ReactNode } from 'react';

export type LayoutStateType = {
  drawerVisible?: boolean;
  drawerCurrentItem?: string;
  //breadcrumbs: string[];
};
export enum LayoutProviderActionType {
  CONTEXT_ACTION_ACTIVE_ITEM = 'CONTEXT_ACTION_ACTIVE_ITEM',
  CONTEXT_ACTION_OPEN_DRAWER = 'CONTEXT_ACTION_OPEN_DRAWER',
}

export type LayerProviderProps = {
  children: ReactNode;
  options?: LayoutStateType | null;
};

export type LayoutContextActionProps = {
  type: LayoutProviderActionType;
  payload?: LayoutStateType;
};

export type LayoutContextProps = {
  state: LayoutStateType;
  dispatch: Dispatch<LayoutContextActionProps>;
};
