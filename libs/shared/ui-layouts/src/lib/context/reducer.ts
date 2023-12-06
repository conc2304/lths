import { LayoutStateType, LayoutContextActionProps, LayoutProviderActionType } from './types';

export const initialState: LayoutStateType = {
  drawerCurrentItem: '/',
  drawerOpen: false,
};

const layoutReducer = (state: LayoutStateType, action: LayoutContextActionProps) => {
  switch (action.type) {
    case LayoutProviderActionType.LAYOUT_ACTION_SET_ACTIVE_ITEM: {
      const drawerCurrentItem = action.payload?.drawerCurrentItem;
      return { ...state, drawerCurrentItem };
    }

    case LayoutProviderActionType.LAYOUT_ACTION_OPEN_DRAWER: {
      const drawerOpen = action.payload?.drawerOpen;
      return { ...state, drawerOpen };
    }
    case LayoutProviderActionType.LAYOUT_ACTION_SET_BREADCRUMBS: {
      const breadcrumbs = action.payload?.breadcrumbs;
      return { ...state, breadcrumbs };
    }
    case LayoutProviderActionType.LAYOUT_ACTION_SET_PAGE_TITLE: {
      const pageTitle = action.payload?.pageTitle;
      return { ...state, pageTitle };
    }

    default: {
      return initialState;
    }
  }
};

export default layoutReducer;
