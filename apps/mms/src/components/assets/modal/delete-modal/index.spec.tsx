import React, { useState } from 'react';
import { Button } from '@mui/material';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import { DeleteModal, DeleteModalProps } from '.';

describe('DeleteModal Component', () => {
  let props: DeleteModalProps;
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
        <DeleteModal {...props} />
      </>
    );
  };

  test('should render DeleteModal component with correct values', () => {
    render(<DeleteModal {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('Are you Sure you want to delete?')).toBeInTheDocument();
    expect(screen.getByText('KEEP')).toBeInTheDocument();
    expect(screen.getByText('DELETE')).toBeInTheDocument();
    expect(screen.getByText('deleteThisItemName')).toBeInTheDocument();
  });

  test('should render DeleteModal component with palcehholder title', () => {
    props.itemToDelete = undefined;
    render(<DeleteModal {...props} />);

    expect(screen.getByText('Placeholder_File_Name')).toBeInTheDocument();
  });

  test('should render DeleteModal on open', () => {
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

  test('DeleteModal calls correct function on keep', () => {
    render(<DeleteModal {...props} />);

    // Act
    const cancelButton = screen.getByText('KEEP');
    fireEvent.click(cancelButton);

    //Assert
    expect(onClickKeepButtonMock).toHaveBeenCalledTimes(1);
  });

  test('DeleteModal calls correct function on Delete', () => {
    render(<DeleteModal {...props} />);

    // Act
    const deleteButton = screen.getByText('DELETE');
    fireEvent.click(deleteButton);

    // assert
    expect(onClickDeleteButtonMock).toHaveBeenCalledTimes(1);
  });
});
