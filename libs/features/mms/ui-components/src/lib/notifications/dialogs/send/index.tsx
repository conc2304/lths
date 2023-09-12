import { AlertDialog } from '../../../common';

type SendAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSend: () => void;
  isLoading: boolean;
};

const SendAlert = ({ isOpen, handleClose, handleSend, isLoading }: SendAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      title="Send now?"
      description="This notification will be sent immediately."
      cancelText="CANCEL"
      handleClose={handleClose}
      confirmText="SEND NOW"
      handleConfirm={handleSend}
      isLoading={isLoading}
    />
  );
};

export default SendAlert;
