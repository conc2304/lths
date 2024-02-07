import { Button, DialogActions as DialogActionsMui, SxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { pxToRem } from '@lths/shared/utils';

type DialogActionsProps = {
  cancelText?: string;
  onCancel: () => void;
  confirmText?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  sx?: SxProps;
};

export const DialogActions = (props: DialogActionsProps) => {
  const { cancelText = 'Cancel', confirmText = 'Confirm', isSubmitting, onCancel, disabled, sx = {} } = props;

  return (
    <DialogActionsMui sx={{ pr: '1.5rem', pb: '2rem', ...sx }} data-testid="Dialog-Form--actions-wrapper">
      <Button sx={{ mr: pxToRem(8) }} onClick={onCancel} variant="outlined" color="primary">
        {cancelText}
      </Button>
      <LoadingButton
        loading={isSubmitting}
        disabled={disabled || isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
      >
        {confirmText}
      </LoadingButton>
    </DialogActionsMui>
  );
};
