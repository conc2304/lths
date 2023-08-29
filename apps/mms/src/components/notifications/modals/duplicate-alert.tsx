import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type DuplicateAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSend: () => void;
};

const DuplicateAlert = ({ isOpen, handleClose, handleSend }: DuplicateAlertProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Duplicate?</DialogTitle>
      <DialogContent>A duplicate of this notification will be created.</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button onClick={handleSend}>DUPLICATE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DuplicateAlert;
