import { ComponentType } from 'react';

import { useFilterFormState } from './context';
import { FilterFormStateContextType } from './types';

export const withFilterFormStateContext = <P extends object>(
  Component: ComponentType<P & FilterFormStateContextType>
) => {
  return function WithFilterFormStateContext(props: P) {
    const contextValues = useFilterFormState();

    return <Component {...props} {...contextValues} />;
  };
};
