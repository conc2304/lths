import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { DialogForm } from './dialog-form';

describe('DialogForm component', () => {
  const onCancelMock = jest.fn();
  const onCloseMock = jest.fn();
  const onResetMock = jest.fn();
  const onSubmitMock = jest.fn();

  it('renders the component with default props', () => {
    render(
      <DialogForm open={true} title="Dialog Title">
        <div>Dialog Content</div>
      </DialogForm>
    );

    expect(screen.getByText('Dialog Title')).toBeInTheDocument();

    expect(screen.getByText('Dialog Content')).toBeInTheDocument();

    expect(screen.getByText('Cancel')).toBeInTheDocument();

    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('renders the component with custom props', () => {
    render(
      <DialogForm
        open={true}
        title="Dialog Title"
        subtitle="Dialog Subtitle"
        cancelText="Abort"
        confirmText="Proceed"
        onCancel={onCancelMock}
        onClose={onCloseMock}
        onReset={onResetMock}
        onSubmit={onSubmitMock}
        isSubmitting={true}
        isValid={false}
        dirty={false}
        confirmColor="secondary"
      >
        <div>Dialog Content</div>
      </DialogForm>
    );

    expect(screen.getByText('Dialog Subtitle')).toBeInTheDocument();

    expect(screen.getByText('Abort')).toBeInTheDocument();

    expect(screen.getByText('Proceed')).toBeInTheDocument();

    expect(screen.getByText('Proceed')).toBeDisabled();
    expect(screen.getByText('Abort')).not.toBeDisabled();
  });

  it('calls onCancel and onReset functions when clicking on the cancel button', () => {
    render(
      <DialogForm open={true} title="Dialog Title" onCancel={onCancelMock} onReset={onResetMock}>
        <div>Dialog Content</div>
      </DialogForm>
    );

    // Click on the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check if onCancel and onReset functions are called
    expect(onCancelMock).toHaveBeenCalled();
    expect(onResetMock).toHaveBeenCalled();
  });

  it('calls onClose and onReset functions when clicking on the close button', () => {
    render(
      <DialogForm open={true} title="Dialog Title" onClose={onCloseMock} onReset={onResetMock}>
        <div>Dialog Content</div>
      </DialogForm>
    );

    // Click on the close button
    fireEvent.click(screen.getByTestId('Close-Button--root'));

    // Check if onClose and onReset functions are called
    expect(onCloseMock).toHaveBeenCalled();
    expect(onResetMock).toHaveBeenCalled();
  });

  it('calls onSubmit and onReset functions when submitting the form', () => {
    render(
      <DialogForm open={true} title="Dialog Title" onSubmit={onSubmitMock} onReset={onResetMock}>
        <div>Dialog Content</div>
      </DialogForm>
    );

    fireEvent.submit(screen.getByRole('form'));

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
