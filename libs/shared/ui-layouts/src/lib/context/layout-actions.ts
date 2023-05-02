import { Dispatch } from 'react';

import { LayoutStateType, LayoutContextActionProps, LayoutProviderActionType } from './types';

export const setDrawerVisibility = (dispatch: Dispatch<LayoutContextActionProps>, drawerVisible: boolean) => {
  const payload: LayoutStateType = { drawerVisible };
  const type: LayoutProviderActionType = LayoutProviderActionType.CONTEXT_ACTION_OPEN_DRAWER;
  return dispatch({ type, payload });
};
export const setDrawerSelectedItem = (dispatch: Dispatch<LayoutContextActionProps>, drawerCurrentItem: string) => {
  const payload: LayoutStateType = { drawerCurrentItem };
  const type: LayoutProviderActionType = LayoutProviderActionType.CONTEXT_ACTION_ACTIVE_ITEM;
  //return dispatch({ type, LayoutStateType:{drawerCurrentItem}});
  return dispatch({ type, payload });
};
