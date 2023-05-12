import { ComponentType, FC } from 'react';

import { RootState, useAppSelector } from '../store';

export interface Selector<CTX> {
  key: keyof CTX;
  selector: (rootState: RootState) => any;
}

interface WithReduxAndContextProps<CTX> {
  contextProvider: ComponentType<any>;
  selectors: Selector<CTX>[];
  useSelector: typeof useAppSelector;
}

export const withReduxAndContext =
  <CTX extends object>({ contextProvider: ContextProvider, selectors, useSelector }: WithReduxAndContextProps<CTX>) =>
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithReduxAndContextComponent: FC<P> = (props) => {
      // loop over the selectors we are passing in and assign them to our state object
      const selectedState: { [K in keyof CTX]: any } = {} as { [K in keyof CTX]: any };
      for (const { key, selector } of selectors) {
        selectedState[key] = useSelector(selector);
      }

      return (
        <ContextProvider>
          <WrappedComponent {...props} />
        </ContextProvider>
      );
    };

    return WithReduxAndContextComponent;
  };
