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
      title="You haven't saved your work!"
      description="You have made updates to this page without saving your work. Do you want to save before leaving this page?"
      cancelText="DON'T SAVE"
      handleClose={onCancel}
      confirmText="SAVE"
      handleConfirm={onSave}
      isLoading={isLoading}
    />
  );
};
