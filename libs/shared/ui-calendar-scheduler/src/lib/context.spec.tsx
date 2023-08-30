import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { ListViewContextProvider, useListViewContext, withListViewContextProvider } from './context';

describe('ListViewContextProvider', () => {
  it('renders children with provided context values', () => {
    const headerCells = [{ id: 'column1', label: 'Column 1', sortable: false }];
    const rowBuilder = () => <div>Row</div>;
    const headerToEventValueMap = () => 'Value';

    const TestComponent = () => {
      const { headerCells: hCells, rowBuilder: rBuilder, headerToEventValueMap: hMap } = useListViewContext();
      expect(hCells).toEqual(headerCells);
      expect(rBuilder).toEqual(rowBuilder);
      expect(hMap).toEqual(headerToEventValueMap);
      return <div>Test</div>;
    };

    const WrappedTestComponent = withListViewContextProvider(TestComponent, {
      headerCells,
      rowBuilder,
      headerToEventValueMap,
    });

    const { getByText } = render(
      <ListViewContextProvider values={{ headerCells, rowBuilder, headerToEventValueMap }}>
        <WrappedTestComponent />
      </ListViewContextProvider>
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('throws an error if required context values are missing', () => {
    const MissingPropsComponent = () => {
      return (
        <ListViewContextProvider
          values={{
            // @ts-expect-error forcing undefined for failure testing
            headerCells: undefined,
            // @ts-expect-error forcing undefined for failure testing
            rowBuilder: undefined,
            // @ts-expect-error forcing undefined for failure testing
            headerToEventValueMap: undefined,
          }}
        >
          <div>Test</div>
        </ListViewContextProvider>
      );
    };

    expect(() => {
      render(<MissingPropsComponent />);
    }).toThrow(
      'ListViewContextProvider is missing the following props: headerCells, rowBuilder, headerToEventValueMap'
    );
  });

  it('throws an error if used outside of the context provider', () => {
    const TestComponent = () => {
      useListViewContext();
      return <div>Test</div>;
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useListViewContext has to be used within <ListViewContext.Provider>');
  });
});
