import React, { useState } from 'react';
import { useTheme, Button, Stack, InputLabel, OutlinedInput, InputAdornment, FormGroup } from '@mui/material';
import { Clear } from '@mui/icons-material';

import { DialogForm } from '@lths/shared/ui-elements';

export type RenameModalProps = {
  open: boolean;
  itemToRename?: string;
  onCancel?: () => void;
  onConfirm: (newName: string) => void;
};

export const RenameModal: React.FC<RenameModalProps> = (props) => {
  const { open, itemToRename, onCancel, onConfirm } = props;
  const [newName, setNewName] = useState(itemToRename?.slice(0, itemToRename?.lastIndexOf('.')) || '');
  const [disableOk, setDisableOk] = useState(true);

  const theme = useTheme();

  const handleSubmit = () => {
    const extension = itemToRename?.split('.').pop();
    const nameWithExtension = `${newName}.${extension}`;
    onConfirm && onConfirm(nameWithExtension);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //ToDO: disabel ok as needed for all existing names
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

  const handleClearClick = () => {
    setDisableOk(true);
    setNewName('');
  };

  return (
    <DialogForm
      open={open}
      onClose={onCancel}
      onCancel={onCancel}
      title={'Rename asset'}
      confirmText="Rename"
      onSubmit={handleSubmit}
    >
      <Stack spacing={1} sx={{ paddingBottom: theme.spacing(1), paddingTop: theme.spacing(1) }}>
        <FormGroup>
          <InputLabel htmlFor="new-asset-name">Name</InputLabel>
          <OutlinedInput
            fullWidth
            type={'text'}
            id="new-asset-name"
            label="Name"
            value={newName}
            onChange={handleNameChange}
            placeholder="Enter New Name"
            sx={{
              '& input': {
                height: theme.spacing(3),
                padding: theme.spacing(1),
                paddingLeft: theme.spacing(1.75),
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                {newName && (
                  <Button
                    sx={{
                      width: theme.spacing(4),
                      height: theme.spacing(4),
                      minWidth: 0,
                      padding: 0,
                    }}
                    color="primary"
                    onClick={handleClearClick}
                  >
                    <Clear />
                  </Button>
                )}
              </InputAdornment>
            }
          />
        </FormGroup>
      </Stack>
    </DialogForm>
  );
};
