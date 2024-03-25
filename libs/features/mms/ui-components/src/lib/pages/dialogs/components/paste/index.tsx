import { AlertDialog } from '../../../../common';

type PasteComponentAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

export const PasteComponentAlert = ({ isOpen, handleClose, handleConfirm }: PasteComponentAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      title="Paste?"
      description="Would you like to paste the copied component to this page?"
      cancelText="NO"
      handleClose={handleClose}
      confirmText="YES"
      handleConfirm={handleConfirm}
    />
  );
};
