import { AlertDialog } from '../../../common';

type DuplicateAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleDuplicate: () => void;
  isLoading: boolean;
};

export const DuplicatePageAlert = ({ isOpen, handleClose, handleDuplicate, isLoading }: DuplicateAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      title="Duplicate?"
      description="A duplicate of this page will be created."
      cancelText="CANCEL"
      handleClose={handleClose}
      confirmText="DUPLICATE"
      handleConfirm={handleDuplicate}
      isLoading={isLoading}
    />
  );
};
