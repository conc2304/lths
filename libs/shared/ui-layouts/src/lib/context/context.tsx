import { createContext, useContext, useReducer } from 'react';

import reducer, { initialState } from './reducer';
import { LayerProviderProps, LayoutContextProps } from './types';

export const LayoutContext = createContext<LayoutContextProps>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

const LayoutProvider = ({ children }: LayerProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}

export { LayoutProvider, useLayout };
