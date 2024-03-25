import {
  Button,
  ButtonPropsColorOverrides,
  DialogActions as DialogActionsMui,
  DialogActionsProps as DialogActionsPropsMui,
  SxProps,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { OverridableStringUnion } from '@mui/types';

import { pxToRem } from '@lths/shared/utils';

type DialogActionsProps = {
  cancelText?: string;
  onCancel: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  isLoading?: boolean;
  isSubmitting?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  sx?: SxProps;
  confirmColor?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
  slotProps?: {
    DialogActions?: DialogActionsPropsMui;
  };
};

export const DialogActions = (props: DialogActionsProps) => {
  const {
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    onConfirm,
    isLoading,
    isSubmitting,
    onCancel,
    disabled,
    sx = {},
    destructive = false,
    confirmColor = 'primary',
    slotProps = {
      DialogActions: {},
    },
  } = props;

  return (
    <DialogActionsMui
      sx={{ p: '1.5rem', ...sx }}
      data-testid="Dialog-Form--actions-wrapper"
      {...slotProps.DialogActions}
    >
      <Button sx={{ mr: pxToRem(8) }} onClick={onCancel} variant="outlined" color="secondary">
        {cancelText}
      </Button>
      <LoadingButton
        loading={isLoading || isSubmitting}
        disabled={disabled || isSubmitting || isLoading}
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
