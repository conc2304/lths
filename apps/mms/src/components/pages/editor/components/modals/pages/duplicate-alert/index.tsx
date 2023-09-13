import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const DuplicateAlert = ({ isOpen, onClose, onConfirm, isLoading }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight={500} fontSize="1.5rem">
        Duplicate?
      </DialogTitle>
      <DialogContent sx={{ fontSize: '0.875rem', fontWeight: 400, color: 'rgba(0,0,0,0.6)' }}>
        A duplicate of this page will be created.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ fontWeight: 600 }}>
          CANCEL
        </Button>
        <LoadingButton loading={isLoading} onClick={onConfirm} sx={{ fontWeight: 600 }}>
          DUPLICATE
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DuplicateAlert;
