import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import { ErrorBoundary } from './error-boundary';

const fallbackMockText = 'Fallback UI';

describe('ErrorBoundary', () => {
  const realError = console.error;
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  afterEach(() => {
    console.error = realError;
    jest.restoreAllMocks();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary fallback={fallbackMockText}>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('Error-Boundary--root')).toBeNull();
  });

  it('should render the fallback UI when an error occurs', () => {
    console.error = jest.fn();

    const ThrowError = ({ msg }) => {
      throw new Error(msg);
    };

    const mockError = 'OOPSIE DAISY';

    render(
      <ErrorBoundary fallback={fallbackMockText}>
        <div data-testid="child">Child Component</div>

        <ThrowError msg={mockError} />
      </ErrorBoundary>,
      { wrapper: HashRouter }
    );

    expect(screen.getByTestId('Error-Boundary--root')).toBeInTheDocument();
    expect(screen.getByText(fallbackMockText)).toBeInTheDocument();
    expect(screen.queryByTestId('child')).toBeNull();
    console.error = realError;
  });
});
