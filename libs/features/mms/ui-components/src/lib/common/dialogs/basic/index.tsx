import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type AlertDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText: string;
  isLoading?: boolean;
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
}: AlertDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight={500} fontSize="1.5rem">
        {title}
      </DialogTitle>
      <DialogContent sx={{ fontSize: '0.875rem', fontWeight: 400, color: 'rgba(0,0,0,0.6)' }}>
        {description}
      </DialogContent>
      <DialogActions>
        {cancelText && (
          <Button onClick={handleClose} sx={{ fontWeight: 600 }}>
            {cancelText}
          </Button>
        )}
        <LoadingButton disabled={isLoading} loading={isLoading} onClick={handleConfirm} sx={{ fontWeight: 600 }}>
          {confirmText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
