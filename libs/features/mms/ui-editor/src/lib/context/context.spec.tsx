import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { EditorProvider, useEditor } from './context'; // Import your module and components

describe('EditorProvider', () => {
  it('should provide the editor context', () => {
    const mockChild = <div>Mock Child</div>;
    const initialValue = { components: [] };

    const { getByText } = render(<EditorProvider initialValue={initialValue}>{mockChild}</EditorProvider>);
    expect(getByText('Mock Child')).toBeInTheDocument();
  });
});

describe('useEditor', () => {
  const realError = console.error;
  afterEach(() => {
    console.error = realError;
  });

  it('should throw an error when used outside of EditorProvider', () => {
    console.error = jest.fn();

    const MockComponent = () => {
      useEditor();
      return null;
    };

    expect(() => {
      render(<MockComponent />);
    }).toThrow('useEditor must be used within <EditorContext.Provider>...</EditorContext.Provider>');
  });
});
