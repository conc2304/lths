import * as React from 'react';

export type LayoutStateType = {
  drawerVisible?: boolean;
  drawerCurrentItem?: string;
};
export enum LayoutProviderActionType {
  CONTEXT_ACTION_ACTIVE_ITEM = 'CONTEXT_ACTION_ACTIVE_ITEM',
  CONTEXT_ACTION_OPEN_DRAWER = 'CONTEXT_ACTION_OPEN_DRAWER',
}
const initialState: LayoutStateType = {
  drawerCurrentItem: '/',
  drawerVisible: false,
};
export type LayerProviderProps = {
  children: React.ReactNode;
  options?: LayoutStateType | null;
};

export type LayoutContextActionProps = {
  type: LayoutProviderActionType;
  payload?: LayoutStateType;
};

export type LayoutContextProps = {
  state: LayoutStateType;
  dispatch: React.Dispatch<LayoutContextActionProps>;
};

export const LayoutContext = React.createContext<LayoutContextProps>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

function layoutReducer(
  state: LayoutStateType,
  action: LayoutContextActionProps
) {
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
}
const LayoutProvider = ({ children, options }: LayerProviderProps) => {
  const [state, dispatch] = React.useReducer(layoutReducer, initialState);
  const value = { state, dispatch };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

function useLayout() {
  const context = React.useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}

export { LayoutProvider, useLayout };
