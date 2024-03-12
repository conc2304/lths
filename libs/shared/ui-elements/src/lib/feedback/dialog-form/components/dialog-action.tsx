import { Button, ButtonPropsColorOverrides, DialogActions as DialogActionsMui, SxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { OverridableStringUnion } from '@mui/types';

import { pxToRem } from '@lths/shared/utils';

type DialogActionsProps = {
  cancelText?: string;
  onCancel: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  destructive?: boolean;
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
    onConfirm,
    isSubmitting,
    onCancel,
    disabled,
    sx = {},
    destructive = false,
    confirmColor = 'primary',
  } = props;

  return (
    <DialogActionsMui sx={{ p: '1.5rem', ...sx }} data-testid="Dialog-Form--actions-wrapper">
      <Button sx={{ mr: pxToRem(8) }} onClick={onCancel} variant="outlined" color="secondary">
        {cancelText}
      </Button>
      <LoadingButton
        loading={isSubmitting}
        disabled={disabled || isSubmitting}
        aria-disabled={disabled || isSubmitting}
        type="submit"
        variant="contained"
        color={!destructive ? confirmColor : 'error'}
        onClick={onConfirm}
      >
        {confirmText}
      </LoadingButton>
    </DialogActionsMui>
  );
};
