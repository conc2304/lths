import { AlertDialog } from '../../../common';

type DuplicateAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleDuplicate: () => void;
  isLoading: boolean;
  description?: string;
};

export const DuplicatePageAlert = (props: DuplicateAlertProps) => {
  const { 
    isOpen, 
    handleClose, 
    handleDuplicate, 
    isLoading,
    description = "A duplicate of this page will be created."
  } = props;

  return (
    <AlertDialog
      isOpen={isOpen}
      title="Duplicate page"
      description={description}
      cancelText="CANCEL"
      handleClose={handleClose}
      confirmText="DUPLICATE"
      handleConfirm={handleDuplicate}
      isLoading={isLoading}
    />
  );
};
