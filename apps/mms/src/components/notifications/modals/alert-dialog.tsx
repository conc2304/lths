import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type AlertDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  isLoading: boolean;
};

const AlertDialog = ({
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
        <LoadingButton loading={isLoading} onClick={handleClose} sx={{ fontWeight: 600 }}>
          {cancelText}
        </LoadingButton>
        <Button onClick={handleConfirm} sx={{ fontWeight: 600 }}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
