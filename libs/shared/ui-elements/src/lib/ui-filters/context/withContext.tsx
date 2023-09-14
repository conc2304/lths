import { ComponentType } from 'react';

import { useFilterFormContext } from './context';
import { FilterFormContextType } from '../../ui-filters';

export const withFilterFormContext = <P extends object>(
  Component: ComponentType<P & Partial<FilterFormContextType>>
) => {
  return function WithFilterFormStateContext(props: P) {
    const contextValues = useFilterFormContext();

    return <Component {...props} {...contextValues} />;
  };
};
