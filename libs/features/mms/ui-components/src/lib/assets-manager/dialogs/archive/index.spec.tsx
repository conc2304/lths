import React, { useState } from 'react';
import { Button } from '@mui/material';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import { ArchiveModal, ArchiveModalProps } from '.';

describe('ArchiveModal Component', () => {
  const onCancel = jest.fn();
  const onConfirm = jest.fn();
  const props: ArchiveModalProps = {
    open: true,
    itemToDelete: 'deleteThisItemName.file',
    onCancel: onCancel,
    onConfirm: onConfirm,
  };

  afterEach(() => {
    // Set up the props for each test case
    jest.clearAllMocks();
  });

  const ModalWrapper = () => {
    const [open, setOpen] = useState(false);
    props.open = open;
    props.onConfirm = () => {
      onConfirm();
      setOpen(false);
    };

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <ArchiveModal {...props} />
      </>
    );
  };

  test('should render ArchiveModal component with correct values', () => {
    const { getByText } = render(<ArchiveModal {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(getByText('Delete file')).toBeInTheDocument();
    expect(getByText('Keep')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
    expect(getByText(props.itemToDelete)).toBeInTheDocument();
  });

  test('should render ArchiveModal on open', () => {
    render(<ModalWrapper />);

    // Assert
    expect(screen.queryByText('Delete file')).not.toBeInTheDocument();
    expect(screen.queryByText('Keep')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    expect(screen.queryByText(props.itemToDelete)).not.toBeInTheDocument();

    // Act
    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('Delete file')).toBeInTheDocument();
    expect(screen.getByText('Keep')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText(props.itemToDelete)).toBeInTheDocument();
  });

  test('ArchiveModal calls correct function on keep', () => {
    render(<ArchiveModal {...props} />);

    // Act
    const cancelButton = screen.getByText('Keep');
    fireEvent.click(cancelButton);

    //Assert
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('ArchiveModal calls correct function on Delete', () => {
    render(<ArchiveModal {...props} />);

    // Act
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // assert
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
