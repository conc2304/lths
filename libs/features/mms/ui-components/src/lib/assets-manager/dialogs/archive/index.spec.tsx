import React, { useState } from 'react';
import { Button } from '@mui/material';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import { ArchiveModal, ArchiveModalProps } from '.';

describe('ArchiveModal Component', () => {
  let props: ArchiveModalProps;
  let onClickKeepButtonMock: jest.Mock;
  let onClickDeleteButtonMock: jest.Mock;
  beforeEach(() => {
    // Set up the props for each test case
    onClickKeepButtonMock = jest.fn();
    onClickDeleteButtonMock = jest.fn();
    props = {
      open: true,
      itemToDelete: 'deleteThisItemName',
      onClickKeepButton: onClickKeepButtonMock,
      onClickDeleteButton: onClickDeleteButtonMock,
    };
  });

  afterEach(() => {
    // Set up the props for each test case
    jest.clearAllMocks();
  });

  const ModalWrapper = () => {
    const [open, setOpen] = useState(false);
    props.open = open;
    props.onClickKeepButton = () => {
      onClickKeepButtonMock();
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
    render(<ArchiveModal {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('Are you Sure you want to delete?')).toBeInTheDocument();
    expect(screen.getByText('KEEP')).toBeInTheDocument();
    expect(screen.getByText('DELETE')).toBeInTheDocument();
    expect(screen.getByText('deleteThisItemName')).toBeInTheDocument();
  });

  test('should render ArchiveModal component with palcehholder title', () => {
    props.itemToDelete = undefined;
    render(<ArchiveModal {...props} />);

    expect(screen.getByText('Placeholder_File_Name')).toBeInTheDocument();
  });

  test('should render ArchiveModal on open', () => {
    render(<ModalWrapper />);

    // Assert
    expect(screen.queryByText('Are you Sure you want to delete?')).not.toBeInTheDocument();
    expect(screen.queryByText('KEEP')).not.toBeInTheDocument();
    expect(screen.queryByText('DELETE')).not.toBeInTheDocument();
    expect(screen.queryByText('deleteThisItemName')).not.toBeInTheDocument();

    // Act
    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('Are you Sure you want to delete?')).toBeInTheDocument();
    expect(screen.getByText('KEEP')).toBeInTheDocument();
    expect(screen.getByText('DELETE')).toBeInTheDocument();
    expect(screen.getByText('deleteThisItemName')).toBeInTheDocument();
  });

  test('ArchiveModal calls correct function on keep', () => {
    render(<ArchiveModal {...props} />);

    // Act
    const cancelButton = screen.getByText('KEEP');
    fireEvent.click(cancelButton);

    //Assert
    expect(onClickKeepButtonMock).toHaveBeenCalledTimes(1);
  });

  test('ArchiveModal calls correct function on Delete', () => {
    render(<ArchiveModal {...props} />);

    // Act
    const deleteButton = screen.getByText('DELETE');
    fireEvent.click(deleteButton);

    // assert
    expect(onClickDeleteButtonMock).toHaveBeenCalledTimes(1);
  });
});
