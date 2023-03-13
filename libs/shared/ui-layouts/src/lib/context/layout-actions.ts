import {
  LayoutStateType,
  LayoutContextActionProps,
  LayoutProviderActionType,
} from './layout-context';

export const setDrawerVisibility = (
  dispatch: React.Dispatch<LayoutContextActionProps>,
  drawerVisible: boolean
) => {
  const payload: LayoutStateType = { drawerVisible };
  const type: LayoutProviderActionType =
    LayoutProviderActionType.CONTEXT_ACTION_OPEN_DRAWER;
  return dispatch({ type, payload });
};
export const setDrawerSelectedItem = (
  dispatch: React.Dispatch<LayoutContextActionProps>,
  drawerCurrentItem: string
) => {
  const payload: LayoutStateType = { drawerCurrentItem };
  const type: LayoutProviderActionType =
    LayoutProviderActionType.CONTEXT_ACTION_ACTIVE_ITEM;
  //return dispatch({ type, LayoutStateType:{drawerCurrentItem}});
  return dispatch({ type, payload });
};
