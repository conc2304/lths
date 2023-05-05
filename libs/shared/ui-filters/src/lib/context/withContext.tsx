import { ComponentType } from 'react';

import { FilterFormContextType } from '@lths/types/ui-filters';

import { useFilterFormContext } from './context';

export const withFilterFormContext = <P extends object>(
  Component: ComponentType<P & Partial<FilterFormContextType>>
) => {
  return function WithFilterFormStateContext(props: P) {
    const contextValues = useFilterFormContext();

    return <Component {...props} {...contextValues} />;
  };
};
