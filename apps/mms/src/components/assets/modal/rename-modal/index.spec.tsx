import React, { useState } from 'react';
import { Button } from '@mui/material';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import { RenameModal, RenameModalProps } from '.';

describe('RenameModal Component', () => {
  let props: RenameModalProps;
  let onClickCancelButton: jest.Mock;
  let onClickOkButtonMock: jest.Mock;
  beforeEach(() => {
    // Set up the props for each test case
    onClickCancelButton = jest.fn();
    onClickOkButtonMock = jest.fn();
    props = {
      open: true,
      itemToRename: 'renameThisItemName',
      onClickCancelButton: onClickCancelButton,
      onClickOkButton: onClickOkButtonMock,
    };
  });

  afterEach(() => {
    // Set up the props for each test case
    jest.clearAllMocks();
  });

  const ModalWrapper = () => {
    const [open, setOpen] = useState(false);
    props.open = open;
    props.onClickCancelButton = () => {
      onClickCancelButton();
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
    expect(screen.getByText('Rename asset?')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('should render RenameModal on open', () => {
    render(<ModalWrapper />);

    // Assert
    expect(screen.queryByText('Rename asset?')).not.toBeInTheDocument();
    expect(screen.queryByText('CANCEL')).not.toBeInTheDocument();
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
    expect(screen.queryByText('Name')).not.toBeInTheDocument();

    // Act
    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('Rename asset?')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('RenameModal calls correct function on cancal', () => {
    render(<RenameModal {...props} />);

    // Act
    const cancelButton = screen.getByText('CANCEL');
    fireEvent.click(cancelButton);

    //Assert
    expect(onClickCancelButton).toHaveBeenCalledTimes(1);
  });

  test('RenameModal ok function is called with correct prop', () => {
    render(<RenameModal {...props} />);

    // test name has changed
    const nameLabelP = screen.getByText('Name').parentElement;
    if (nameLabelP === null) throw new Error('Label Parent element is null');
    const nameInput = nameLabelP.querySelector('input');
    if (nameInput === null) throw new Error('Input element is null');

    // Act
    fireEvent.change(nameInput, { target: { value: 'The Best File Name' } });
    const okButton = screen.getByText('OK');
    fireEvent.click(okButton);

    // assert
    expect(onClickOkButtonMock).toHaveBeenCalledWith('The Best File Name');
  });

  test('RenameModal ok cant be clicked when empty or no change', () => {
    render(<RenameModal {...props} />);

    // test name hasn't changed
    // Act
    const okButton = screen.getByText('OK');
    fireEvent.click(okButton);

    // assert
    expect(onClickOkButtonMock).toHaveBeenCalledTimes(0);

    // test name is empty
    const nameLabelP = screen.getByText('Name').parentElement;
    if (nameLabelP === null) throw new Error('Label Parent element is null');
    const nameInput = nameLabelP.querySelector('input') as HTMLInputElement;

    // Act
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(okButton);
    // assert
    expect(onClickOkButtonMock).toHaveBeenCalledTimes(0);
  });

  test('RenameModal test change input', () => {
    render(<RenameModal {...props} />);

    // Get name input
    const nameLabelP = screen.getByText('Name').parentElement;
    if (nameLabelP === null) throw new Error('Label Parent element is null');
    const nameInput = nameLabelP.querySelector('input') as HTMLInputElement;

    expect(nameInput.value).toBe(props.itemToRename);

    // Act
    fireEvent.change(nameInput, { target: { value: 'New Name2' } });

    // assert
    expect(nameInput.value).toBe('New Name2');
  });

  test('RenameModal test clear input', () => {
    render(<RenameModal {...props} />);

    // Get name input
    const nameLabelP = screen.getByText('Name').parentElement;
    if (nameLabelP === null) throw new Error('Label Parent element is null');
    const nameInput = nameLabelP.querySelector('input') as HTMLInputElement;
    const clearButton = nameLabelP.querySelector('button') as HTMLButtonElement;

    expect(nameInput.value).toBe(props.itemToRename);

    // Act
    fireEvent.click(clearButton);

    // assert
    expect(nameInput.value).toBe('');
  });
});
