import React, { useState } from 'react';
import { useTheme, Stack, FormGroup, TextField } from '@mui/material';

import { DialogForm } from '@lths/shared/ui-elements';

export type RenameModalProps = {
  open: boolean;
  itemToRename?: string;
  onCancel?: () => void;
  onConfirm: (newName: string) => void;
};

export const RenameModal: React.FC<RenameModalProps> = (props) => {
  const { open, itemToRename, onCancel, onConfirm } = props;
  const fileName = itemToRename?.slice(0, itemToRename?.lastIndexOf('.'));
  const [newName, setNewName] = useState(fileName || '');
  const [disableOk, setDisableOk] = useState(true);

  const theme = useTheme();

  const handleSubmit = () => {
    const extension = itemToRename?.split('.').pop();
    const nameWithExtension = `${newName}.${extension}`;
    onConfirm && onConfirm(nameWithExtension);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    if (nextValue === itemToRename || nextValue === '') {
      !disableOk && setDisableOk(true);
      setNewName(nextValue);
    } else {
      setNewName(nextValue);
      disableOk && setDisableOk(false);
    }
    setNewName(nextValue);
  };

  const formIsPristine = fileName === newName;
  const formisValid = newName.length > 0;
  return (
    <DialogForm
      open={open}
      onClose={onCancel}
      onCancel={onCancel}
      title={'Rename asset'}
      confirmText="Rename"
      onSubmit={handleSubmit}
      dirty={!formIsPristine}
      isValid={formisValid}
    >
      <Stack spacing={1} sx={{ paddingBottom: theme.spacing(1), paddingTop: theme.spacing(1) }}>
        <FormGroup>
          <TextField
            fullWidth
            label="Name"
            value={newName}
            onChange={handleNameChange}
            placeholder="Enter New Name"
            size="small"
          />
        </FormGroup>
      </Stack>
    </DialogForm>
  );
};
