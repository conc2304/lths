import { ComponentType } from 'react';

import { FilterFormStateProvider } from './context';

export const withFilterFormStateProvider = <P extends object>(Component: ComponentType<P>) => {
  return function WithFilterFormStateProvider(props: P) {
    return (
      <FilterFormStateProvider>
        <Component {...props} />
      </FilterFormStateProvider>
    );
  };
};
