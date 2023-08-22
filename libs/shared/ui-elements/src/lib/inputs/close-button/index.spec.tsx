import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { CloseButton } from './index';

describe('CloseButton', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  it('renders with default props', () => {
    const { container } = render(<CloseButton {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const { getByTestId } = render(<CloseButton {...defaultProps} />);
    const closeButton = getByTestId('Close-Button--root');

    fireEvent.click(closeButton);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
