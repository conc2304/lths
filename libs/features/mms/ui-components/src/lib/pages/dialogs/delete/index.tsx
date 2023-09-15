import { AlertDialog } from '../../../common';

type DeleteAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  isLoading: boolean;
};

export const DeletePageAlert = ({ isOpen, handleClose, handleDelete, isLoading }: DeleteAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      title="Delete?"
      description="Once deleted this page cannot be restored."
      cancelText="KEEP"
      handleClose={handleClose}
      confirmText="DELETE"
      handleConfirm={handleDelete}
      isLoading={isLoading}
    />
  );
};
