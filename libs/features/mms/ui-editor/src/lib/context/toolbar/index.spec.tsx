import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { ToolbarContextProvider, useToolbarContext } from './index';

describe('ToolbarContextProvider', () => {
  it('should provide the editor context', () => {
    const mockChild = <div>Mock Child</div>;

    const { getByText } = render(<ToolbarContextProvider initialValue={{}}>{mockChild}</ToolbarContextProvider>);
    expect(getByText('Mock Child')).toBeInTheDocument();
  });
});

describe('useToolbarContext', () => {
  const realError = console.error;
  afterEach(() => {
    console.error = realError;
  });

  it('should throw an error when used outside of ToolbarContextProvider', () => {
    console.error = jest.fn();

    const MockComponent = () => {
      useToolbarContext();
      return null;
    };

    expect(() => {
      render(<MockComponent />);
    }).toThrow('useToolbarContext must be used within a ToolbarContextProvider');
  });

  it('renders children with provided context values', () => {
    console.error = jest.fn();
    const initialValue = { test: 'testData' };
    const MockComponent = () => {
      const { data, getValue } = useToolbarContext();
      expect(data.test).toEqual(initialValue.test);
      expect(getValue<string>('test', "default")).toEqual(initialValue.test);
      expect(getValue<string>('wrongKey', "default")).toEqual("default");
      return <div>Test</div>;
    };

    render(
        <ToolbarContextProvider initialValue={initialValue}>
            <MockComponent />
        </ToolbarContextProvider>
    );
  });
});
