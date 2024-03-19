import React from 'react';
import { Typography } from '@mui/material';

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
      onClose={onCancel}
      cancelText="Keep"
      confirmText="Delete"
      destructive
      title={'Delete file'}
      onSubmit={onConfirm}
    >
      <Typography variant="body1">{itemToDelete || 'Placeholder_File_Name'}</Typography>
    </DialogForm>
  );
};
