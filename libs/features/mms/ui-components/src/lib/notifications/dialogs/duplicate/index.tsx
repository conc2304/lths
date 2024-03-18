import { Typography } from '@mui/material';

import { DialogForm } from '@lths/shared/ui-elements';

type DuplicateAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleDuplicate: () => void;
  isLoading: boolean;
};

const DuplicateAlert = ({ isOpen, handleClose, handleDuplicate, isLoading }: DuplicateAlertProps) => {
  return (
    <DialogForm
      open={isOpen}
      title="Duplicate notification"
      onClose={handleClose}
      cancelText="CANCEL"
      confirmText="DUPLICATE"
      onSubmit={handleDuplicate}
      isLoading={isLoading}
    >
      <Typography variant="body1">A duplicate of this notification will be created.</Typography>
    </DialogForm>
  );
};

export default DuplicateAlert;
