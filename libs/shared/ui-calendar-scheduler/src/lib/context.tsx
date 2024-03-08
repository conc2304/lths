import { ComponentType, ReactNode, createContext, useContext } from 'react';
import { Event } from 'react-big-calendar';

import { RowBuilderFn, TableColumnHeader } from '@lths/shared/ui-elements';

export const withListViewContextProvider = <P extends object>(
  Component: ComponentType<P>,
  values: ListViewContextType
) => {
  return function WithListViewContextProvider(props: P) {
    return (
      <ListViewContextProvider values={values}>
        <Component {...props} />
      </ListViewContextProvider>
    );
  };
};

type ListViewContextType<TEvent extends object = Event> = {
  headerCells: TableColumnHeader[];
  rowBuilder: RowBuilderFn<TEvent>;
  headerToEventValueMap: (event: TEvent, column: string) => Date | string | number | undefined;
};

type ListViewContextProviderProps = { children: ReactNode; values: ListViewContextType };
const ListViewContext = createContext<ListViewContextType | null>(null);

const ListViewContextProvider = ({ children, values }: ListViewContextProviderProps) => {
  const { headerCells, rowBuilder, headerToEventValueMap } = values;

  if (!headerCells || !rowBuilder || !headerToEventValueMap) {
    const missingProps = [];
    if (!headerCells) missingProps.push('headerCells');
    if (!rowBuilder) missingProps.push('rowBuilder');
    if (!headerToEventValueMap) missingProps.push('headerToEventValueMap');
    throw new Error(`ListViewContextProvider is missing the following props: ${missingProps.join(', ')}`);
  }
  return (
    <ListViewContext.Provider
      value={{
        headerCells,
        rowBuilder,
        headerToEventValueMap,
      }}
    >
      {children}
    </ListViewContext.Provider>
  );
};

const useListViewContext = () => {
  const listViewContext = useContext(ListViewContext);

  if (!listViewContext) {
    throw new Error('useListViewContext has to be used within <ListViewContext.Provider>');
  }

  return listViewContext;
};

export { ListViewContextProvider, useListViewContext };
