import { AlertDialog } from '../../../common';

type DeleteAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  isLoading: boolean;
  description?: string;
};

export const DeletePageAlert = (props: DeleteAlertProps) => {
  const { 
    isOpen, 
    handleClose, 
    handleDelete, 
    isLoading,
    description = "Once deleted this page cannot be restored."
  } = props;
  return (
    <AlertDialog
      isOpen={isOpen}
      title="Delete page"
      description={description}
      cancelText="Keep"
      handleClose={handleClose}
      destructive={true}
      confirmText="Delete"
      handleConfirm={handleDelete}
      isLoading={isLoading}
    />
  );
};
