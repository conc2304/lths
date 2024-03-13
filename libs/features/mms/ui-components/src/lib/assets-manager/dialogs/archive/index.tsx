import React from 'react';
import { Typography } from '@mui/material';

// import { SimpleModal } from '../simple';
import { DialogForm } from '@lths/shared/ui-elements';

export type ArchiveModalProps = {
  open: boolean;
  itemToDelete?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ArchiveModal: React.FC<ArchiveModalProps> = (props) => {
  const { open, itemToDelete, onConfirm, onCancel } = props;

  return (
    <DialogForm
      open={open}
      onCancel={onCancel}
      cancelText="Keep"
      confirmText="Delete"
      destructive
      title={'Delete file'}
      onClose={onCancel}
      onSubmit={onConfirm}
    >
      <Typography variant="body1">{itemToDelete || 'Placeholder_File_Name'}</Typography>
    </DialogForm>
  );
};
