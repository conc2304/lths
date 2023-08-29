import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type SendAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSend: () => void;
};

const SendAlert = ({ isOpen, handleClose, handleSend }: SendAlertProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Send now?</DialogTitle>
      <DialogContent>This notification will be sent immediately.</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ fontWeight: 500 }}>
          CANCEL
        </Button>
        <Button onClick={handleSend} sx={{ fontWeight: 500 }}>
          SEND NOW
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendAlert;
