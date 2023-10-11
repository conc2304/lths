import React, { useState } from 'react';
import { useTheme, Button, Stack, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import { Clear } from '@mui/icons-material';

import { SimpleModal } from '../simple';

export type RenameModalProps = {
  open: boolean;
  itemToRename?: string;
  onClickCancelButton?: React.MouseEventHandler<HTMLButtonElement>;
  onClickOkButton?: (newName: string) => void;
};

export const RenameModal: React.FC<RenameModalProps> = (props) => {
  const { open, itemToRename, onClickCancelButton, onClickOkButton } = props;
  const [newName, setNewName] = useState(itemToRename?.slice(0, itemToRename?.lastIndexOf('.')) || '');
  const [disableOk, setDisableOk] = useState(true);

  const theme = useTheme();

  const buttonStyle = { radius: '4px', fontWeight: 600, fontSize: theme.spacing(1.75), letterSpacing: '0.15px' };

  const CancelButton = () => {
    return (
      <Button sx={{ ...buttonStyle }} variant="text" onClick={onClickCancelButton}>
        CANCEL
      </Button>
    );
  };

  const OkButton = () => {
    const handleOkButtonClick = () => {
      const extension = itemToRename?.split('.').pop();
      const nameWithExtension = `${newName}.${extension}`;
      onClickOkButton?.(nameWithExtension);
    };

    return (
      <Button sx={{ ...buttonStyle }} variant="text" onClick={handleOkButtonClick} disabled={disableOk}>
        OK
      </Button>
    );
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
    <SimpleModal
      open={open}
      onClose={onClickCancelButton}
      title={'Rename asset?'}
      CloseButton={CancelButton()}
      ActionButton={OkButton()}
      boxStyle={{ minWidth: theme.spacing(55.5) }}
    >
      <Stack spacing={1} sx={{ paddingBottom: theme.spacing(1), paddingTop: theme.spacing(1) }}>
        <InputLabel sx={{ fontSize: theme.spacing(1.5) }}>Name</InputLabel>
        <OutlinedInput
          fullWidth
          type={'text'}
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
      </Stack>
    </SimpleModal>
  );
};
