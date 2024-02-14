import { Button, ButtonPropsColorOverrides, DialogActions as DialogActionsMui, SxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { OverridableStringUnion } from '@mui/types';

import { pxToRem } from '@lths/shared/utils';

type DialogActionsProps = {
  cancelText?: string;
  onCancel: () => void;
  confirmText?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  sx?: SxProps;
  confirmColor?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
};

export const DialogActions = (props: DialogActionsProps) => {
  const {
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    isSubmitting,
    onCancel,
    disabled,
    sx = {},
    confirmColor = 'primary',
  } = props;

  return (
    <DialogActionsMui sx={{ pr: '1.5rem', pb: '2rem', ...sx }} data-testid="Dialog-Form--actions-wrapper">
      <Button sx={{ mr: pxToRem(8) }} onClick={onCancel} variant="outlined" color="secondary">
        {cancelText}
      </Button>
      <LoadingButton
        loading={isSubmitting}
        disabled={disabled || isSubmitting}
        type="submit"
        variant="contained"
        color={confirmColor}
      >
        {confirmText}
      </LoadingButton>
    </DialogActionsMui>
  );
};
