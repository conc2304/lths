import React, { useState } from 'react';
import { Button } from '@mui/material';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RenameModal, RenameModalProps } from '.';

describe('RenameModal Component', () => {
  const onCancel = jest.fn();
  const onConfirm = jest.fn();
  const props: RenameModalProps = {
    open: true,
    itemToRename: 'renameThisItemName.file',
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
    props.onCancel = () => {
      onCancel();
      setOpen(false);
    };

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <RenameModal {...props} />
      </>
    );
  };

  test('should render RenameModal component with correct values', () => {
    render(<RenameModal {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('Rename asset')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  test('should render RenameModal on open', () => {
    render(<ModalWrapper />);

    // Assert
    expect(screen.queryByText('Rename asset')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Rename')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();

    // Act
    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('Rename asset')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  test('RenameModal calls correct function on cancal', () => {
    render(<RenameModal {...props} />);

    // Act
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    //Assert
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('RenameModal ok function is called with correct prop', async () => {
    const user = userEvent.setup();
    render(<RenameModal {...props} />);

    const extension = props.itemToRename?.split('.').pop();

    // test name has changed
    const inputElem = screen.getByLabelText('Name');
    expect(inputElem).toBeInTheDocument();

    // Act
    const newFileName = 'new-file-name';
    const confirmButton = screen.getByText('Rename');
    expect(confirmButton).toBeDisabled();

    await user.clear(inputElem);
    await user.type(inputElem, newFileName);
    expect(inputElem).toHaveValue(newFileName);

    expect(confirmButton).not.toBeDisabled();

    await user.click(confirmButton);

    // assert
    expect(onConfirm).toHaveBeenCalledWith(`${newFileName}.${extension}`);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test('RenameModal ok cant be clicked when empty or no change', () => {
    render(<RenameModal {...props} />);

    // Act
    const confirmButton = screen.getByText('Rename');
    fireEvent.click(confirmButton);

    // assert
    expect(onConfirm).toHaveBeenCalledTimes(0);

    const inputElem = screen.getByLabelText('Name');

    // Act
    fireEvent.change(inputElem, { target: { value: '' } });
    fireEvent.click(confirmButton);

    // assert
    expect(confirmButton).toBeDisabled();
    expect(onConfirm).toHaveBeenCalledTimes(0);
  });
});
