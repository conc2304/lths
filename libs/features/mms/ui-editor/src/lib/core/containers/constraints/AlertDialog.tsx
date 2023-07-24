import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type AlertDialogProps = {
  title: string;
  description: string;
  actions: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
};

const AlertDialog = (props: AlertDialogProps) => {
  const { title, description, actions, isOpen, handleClose } = props;

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ paddingX: 4, paddingBottom: 4 }}>{actions}</DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
