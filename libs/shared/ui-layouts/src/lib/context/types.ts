import { Dispatch, ReactNode } from 'react';

import { BreadcrumbPathProps } from '../outlets/dashboard/content';

export type LayoutStateType = {
  drawerVisible?: boolean;
  drawerCurrentItem?: string;
  breadcrumbs?: BreadcrumbPathProps[] | BreadcrumbPathProps;
};
export enum LayoutProviderActionType {
  LAYOUT_ACTION_SET_ACTIVE_ITEM = 'LAYOUT_ACTION_SET_ACTIVE_ITEM',
  LAYOUT_ACTION_OPEN_DRAWER = 'LAYOUT_ACTION_OPEN_DRAWER',
  LAYOUT_ACTION_SET_BREADCRUMBS = 'LAYOUT_ACTION_SET_BREADCRUMBS',
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
