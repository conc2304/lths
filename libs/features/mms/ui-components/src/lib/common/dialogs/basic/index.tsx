import { Dialog, DialogContent } from '@mui/material';

import { DialogActions, DialogTitle } from '@lths/shared/ui-elements';

type AlertDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText: string;
  isLoading?: boolean;
  destructive?: boolean;
};

export const AlertDialog = ({
  isOpen,
  handleClose,
  handleConfirm,
  title,
  description,
  cancelText,
  confirmText,
  isLoading,
  destructive,
}: AlertDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle title={title}/>
      <DialogContent sx={{ fontSize: '1rem', fontWeight: 400, marginTop: 1 }}>
        {description}
      </DialogContent>
      <DialogActions
        confirmText={confirmText}
        cancelText={cancelText}
        onCancel={handleClose}
        isLoading={isLoading}
        onConfirm={handleConfirm}
        destructive={destructive}
      />
    </Dialog>
  );
};
