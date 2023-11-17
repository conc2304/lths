import { AlertDialog } from '../../../common';
type NoConstraintAlertProps = {
  isOpen: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
};
export const NoConstraintAlert = ({ isOpen, handleConfirm, handleClose }: NoConstraintAlertProps) => {
  return (
    <AlertDialog
      handleClose={handleClose}
      isOpen={isOpen}
      title="Variation constraints required"
      description="You have not specified any constraints on this page variation. You must select at least one unique constraint to create a variation."
      confirmText="OK"
      handleConfirm={handleConfirm}
    />
  );
};
