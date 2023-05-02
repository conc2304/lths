import { LayoutStateType, LayoutContextActionProps, LayoutProviderActionType } from './types';

export const initialState: LayoutStateType = {
  drawerCurrentItem: '/',
  drawerVisible: false,
};

const layoutReducer = (state: LayoutStateType, action: LayoutContextActionProps) => {
  switch (action.type) {
    case LayoutProviderActionType.CONTEXT_ACTION_ACTIVE_ITEM: {
      const drawerCurrentItem = action.payload?.drawerCurrentItem;
      return { ...state, drawerCurrentItem };
    }

    case LayoutProviderActionType.CONTEXT_ACTION_OPEN_DRAWER: {
      const drawerVisible = action.payload?.drawerVisible;
      return { ...state, drawerVisible };
    }

    default: {
      return initialState;
    }
  }
};

export default layoutReducer;
