import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type AlertModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSend: () => void;
  title: string;
  description: string;
};

const AlertModal = ({ isOpen, handleClose, handleSend, title, description }: AlertModalProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button onClick={handleSend}>DUPLICATE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;
