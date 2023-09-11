import { AlertDialog } from '../../../common';

type ArchiveAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleArchive: () => void;
  isLoading: boolean;
};

const ArchiveAlert = ({ isOpen, handleClose, handleArchive, isLoading }: ArchiveAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      title="Archive?"
      description="Once archived this notification cannot be restored."
      cancelText="KEEP"
      handleClose={handleClose}
      confirmText="ARCHIVE"
      handleConfirm={handleArchive}
      isLoading={isLoading}
    />
  );
};

export default ArchiveAlert;
