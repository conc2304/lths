import { ComponentType } from 'react';

import { FilterFormContextProvider } from './context';

export const withFilterFormStateProvider = <P extends object>(Component: ComponentType<P>) => {
  return function WithFilterFormStateProvider(props: P) {
    return (
      <FilterFormContextProvider>
        <Component {...props} />
      </FilterFormContextProvider>
    );
  };
};
