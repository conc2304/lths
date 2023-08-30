import AlertDialog from './alert-dialog';

type DuplicateAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleDuplicate: () => void;
  isLoading: boolean;
};

const DuplicateAlert = ({ isOpen, handleClose, handleDuplicate, isLoading }: DuplicateAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      title="Duplicate?"
      description="A duplicate of this notification will be created."
      cancelText="CANCEL"
      handleClose={handleClose}
      confirmText="DUPLICATE"
      handleConfirm={handleDuplicate}
      isLoading={isLoading}
    />
  );
};

export default DuplicateAlert;
