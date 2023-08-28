import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type ArchiveAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSend: () => void;
};

const ArchiveAlert = ({ isOpen, handleClose, handleSend }: ArchiveAlertProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Archive?</DialogTitle>
      <DialogContent>Once archived this notification cannot be restored.</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>KEEP</Button>
        <Button onClick={handleSend}>ARCHIVE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArchiveAlert;
