import { Typography } from '@mui/material';

import { DialogForm } from '@lths/shared/ui-elements';

type SendAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSend: () => void;
  isLoading: boolean;
};

const SendAlert = ({ isOpen, handleClose, handleSend, isLoading }: SendAlertProps) => {
  return (
    <DialogForm
      title="Send notification now"
      open={isOpen}
      onClose={handleClose}
      onSubmit={handleSend}
      isLoading={isLoading}
      cancelText="CANCEL"
      confirmText="SEND NOW"
    >
      <Typography variant="body1">This notification will be sent immediately.</Typography>
    </DialogForm>
  );
};

export default SendAlert;
