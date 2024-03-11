import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { DialogActions } from './dialog-action';

describe('DialogActions component', () => {
  const onCancelMock = jest.fn();

  it('renders the component with default texts and props', () => {
    render(<DialogActions onCancel={onCancelMock} />);

    expect(screen.getByText('Cancel')).toBeInTheDocument();

    expect(screen.getByText('Confirm')).toBeInTheDocument();

    expect(screen.getByText('Confirm')).not.toBeDisabled();
  });

  it('renders the component with custom texts and props', () => {
    render(
      <DialogActions
        cancelText="Abort"
        confirmText="Proceed"
        onCancel={onCancelMock}
        isSubmitting={true}
        disabled={true}
        confirmColor="secondary"
      />
    );

    expect(screen.getByText('Abort')).toBeInTheDocument();

    expect(screen.getByText('Proceed')).toBeInTheDocument();

    expect(screen.getByText('Proceed')).toBeDisabled();
  });

  it('calls onCancel function when clicking on the cancel button', () => {
    render(<DialogActions onCancel={onCancelMock} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(onCancelMock).toHaveBeenCalled();
  });
});
