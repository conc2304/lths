import { Dispatch } from 'react';

import { LayoutStateType, LayoutProviderActionType, LayoutContextActionProps } from './types';
import { BreadcrumbPathProps } from '../outlets/dashboard/content';

export const setBreadcrumbs =
  (dispatch: Dispatch<LayoutContextActionProps>) => (breadcrumbs: BreadcrumbPathProps[]) => {
    const payload: LayoutStateType = {
      breadcrumbs,
    };
    const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_SET_BREADCRUMBS;
    return dispatch({ type, payload });
  };
export const setDrawerVisibility = (dispatch: Dispatch<LayoutContextActionProps>) => (drawerVisible: boolean) => {
  const payload: LayoutStateType = { drawerVisible };
  const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_OPEN_DRAWER;
  return dispatch({ type, payload });
};

export const setDrawerSelectedItem = (dispatch: Dispatch<LayoutContextActionProps>) => (drawerCurrentItem: string) => {
  const payload: LayoutStateType = { drawerCurrentItem };
  const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_SET_ACTIVE_ITEM;
  //return dispatch({ type, LayoutStateType:{drawerCurrentItem}});
  return dispatch({ type, payload });
};

export const setPageTitle = (dispatch: Dispatch<LayoutContextActionProps>) => (pageTitle: string) => {
  const payload: LayoutStateType = {
    pageTitle,
  }; //.map((o:BreadcrumbPathProps) => o) };
  const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_SET_PAGE_TITLE;
  return dispatch({ type, payload });
};
