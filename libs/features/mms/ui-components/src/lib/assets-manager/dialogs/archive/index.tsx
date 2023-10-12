import React from 'react';
import { useTheme, Button, Typography } from '@mui/material';

import { SimpleModal } from '../simple';

export type ArchiveModalProps = {
  open: boolean;
  itemToDelete?: string;
  onClickKeepButton?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDeleteButton?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ArchiveModal: React.FC<ArchiveModalProps> = (props) => {
  const { open, itemToDelete, onClickKeepButton, onClickDeleteButton } = props;

  const theme = useTheme();

  const buttonStyle = { radius: '4px', fontWeight: 600, fontSize: theme.spacing(1.75), letterSpacing: '0.15px' };

  const KeepButton = () => {
    return (
      <Button sx={{ ...buttonStyle }} variant="text" onClick={onClickKeepButton}>
        KEEP
      </Button>
    );
  };

  const DeleteButton = () => {
    return (
      <Button sx={{ ...buttonStyle }} color="warning" variant="text" onClick={onClickDeleteButton}>
        DELETE
      </Button>
    );
  };

  return (
    <SimpleModal
      open={open}
      onClose={onClickKeepButton}
      title={'Are you Sure you want to delete?'}
      CloseButton={KeepButton()}
      ActionButton={DeleteButton()}
      boxStyle={{ minWidth: theme.spacing(55.5) }}
    >
      <Typography sx={{ letterSpacing: '0.15px' }}>{itemToDelete || 'Placeholder_File_Name'}</Typography>
    </SimpleModal>
  );
};
