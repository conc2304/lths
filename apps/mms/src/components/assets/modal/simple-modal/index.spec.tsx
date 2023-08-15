import React, { useState } from 'react';
import { Button } from '@mui/material';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import { SimpleModal, SimpleModalProps } from '.';

describe('SimpleModal Component', () => {
  let props: SimpleModalProps;
  beforeEach(() => {
    // Set up the props for each test case
    props = {
      open: true,
      title: 'my title',
      CloseButton: <Button>Test Close</Button>,
      ActionButton: <Button>Test Action</Button>,
      children: <div>Modal Content</div>,
    };
  });

  afterEach(() => {
    // Set up the props for each test case
    jest.clearAllMocks();
  });

  const ModalWrapper = () => {
    const [open, setOpen] = useState(false);
    props.open = open;
    props.CloseButton = <Button onClick={() => setOpen(false)}>Close</Button>;
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <SimpleModal {...props} />
      </>
    );
  };

  test('should render SimpleModal component with correct values', () => {
    render(<SimpleModal {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('my title')).toBeInTheDocument();
    expect(screen.getByText('Test Close')).toBeInTheDocument();
    expect(screen.getByText('Test Action')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('should render SimpleModal without buttons', () => {
    props.CloseButton = undefined;
    props.ActionButton = undefined;

    render(<SimpleModal {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('my title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.queryByText('Test Close')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Action')).not.toBeInTheDocument();
  });

  test('should render SimpleModal on open', () => {
    render(<ModalWrapper />);

    // Assert
    expect(screen.queryByText('my title')).not.toBeInTheDocument();
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Action')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();

    // Act
    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('my title')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Test Action')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });
});
