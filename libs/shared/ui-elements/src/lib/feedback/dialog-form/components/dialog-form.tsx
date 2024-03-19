import { ReactNode } from 'react';
import {
  Dialog as DialogMui,
  Box,
  DialogContent,
  ButtonPropsColorOverrides,
  DialogProps,
  DialogContentProps,
  DialogActionsProps,
  DialogTitleProps,
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import { DialogActions } from './dialog-action';
import { DialogTitle } from './dialog-title';

type DialogFormProps = {
  open: boolean;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  confirmColor?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
  onCancel?: () => void;
  onClose?: () => void;
  onReset?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  isLoading?: boolean;
  isValid?: boolean;
  dirty?: boolean;
  destructive?: boolean;
  hasCloseButton?: boolean;
  slotProps?: {
    Dialog?: DialogProps;
    DialogTitle?: DialogTitleProps;
    DialogContent?: DialogContentProps;
    DialogActions?: DialogActionsProps;
  };
};

export const DialogForm = (props: DialogFormProps) => {
  const {
    open,
    title,
    subtitle,
    cancelText,
    confirmText,
    children,
    onCancel,
    onClose,
    onReset,
    onSubmit,
    isSubmitting,
    isLoading,
    isValid = true,
    dirty = true,
    destructive,
    confirmColor = 'primary',
    hasCloseButton = false,
    slotProps: {
      Dialog: DialogProps = {},
      DialogTitle: DialogTitleProps = {},
      DialogContent: DialogContentProps = {},
      DialogActions: DialogActionsProps = {},
    } = {
      DialogProps: {},
      DialogContentProps: {},
      DialogActionsProps: {},
    },
  } = props;

  // this is essentially the same as on close, but exists so that the Cancel Button can perform other behaviors beyond just closing
  const handleOnCancel = () => {
    onCancel && onCancel();
    onClose && onClose();
    onReset && onReset();
  };

  const handleOnClose = () => {
    onClose && onClose();
    onReset && onReset();
  };

  return (
    <DialogMui
      open={open}
      onClose={onClose}
      aria-labelledby="Dialog-Form--root"
      data-testid="DialogFormModal--root"
      {...DialogProps}
    >
      <Box component="form" onSubmit={onSubmit} role="form">
        {title && (
          <DialogTitle
            title={title}
            subtitle={subtitle}
            onClose={hasCloseButton ? handleOnClose : undefined}
            slotProps={{ DialogTitle: DialogTitleProps }}
          />
        )}
        <DialogContent {...DialogContentProps}>{children}</DialogContent>
        <DialogActions
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={handleOnCancel}
          isSubmitting={isSubmitting || isLoading}
          disabled={!isValid || !dirty}
          confirmColor={confirmColor}
          destructive={destructive}
          slotProps={{ DialogActions: DialogActionsProps }}
        />
      </Box>
    </DialogMui>
  );
};
