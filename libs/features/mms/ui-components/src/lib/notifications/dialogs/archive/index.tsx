import { Typography } from '@mui/material';

import { DialogForm } from '@lths/shared/ui-elements';

type ArchiveAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleArchive: () => void;
  isLoading: boolean;
};

const ArchiveAlert = ({ isOpen, handleClose, handleArchive, isLoading }: ArchiveAlertProps) => {
  return (
    <DialogForm
      title="Archive notification"
      open={isOpen}
      onClose={handleClose}
      onSubmit={handleArchive}
      isLoading={isLoading}
      cancelText="KEEP"
      confirmText="ARCHIVE"
    >
      <Typography variant="body1">Once archived this notification cannot be restored.</Typography>
    </DialogForm>
  );
};

export default ArchiveAlert;
