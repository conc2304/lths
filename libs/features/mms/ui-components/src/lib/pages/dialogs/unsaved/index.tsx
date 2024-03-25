import { AlertDialog } from '../../../common';

type UnSavedAlertProps = {
  isOpen: boolean;
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
};

export const UnSavedPageAlert = ({ isOpen, onCancel, onSave, isLoading }: UnSavedAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      title="Save your work"
      description="Leaving this page without saving will discard your changes. Do you want to save your changes?"
      cancelText="Discard"
      handleClose={onCancel}
      confirmText="Save"
      handleConfirm={onSave}
      isLoading={isLoading}
    />
  );
};
