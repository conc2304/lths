import { ReactNode } from 'react';
import { Dialog as DialogMui, Box, styled, DialogContent, ButtonPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import { pxToRem } from '@lths/shared/utils';

import { DialogActions } from './dialog-action';
import { DialogTitle } from './dialog-title';

const StyledDialogContent = styled(DialogContent)(() => ({
  padding: pxToRem(24),
}));

type DialogFormProps = {
  open: boolean;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  title: string | JSX.Element;
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
  isValid?: boolean;
  dirty?: boolean;
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
    isValid = true,
    dirty = true,
    confirmColor = 'primary',
  } = props;

  const handleOnCancel = () => {
    onCancel && onCancel();
    onReset && onReset();
  };
  const handleOnClose = () => {
    onClose && onClose();
    onReset && onReset();
  };

  return (
    <DialogMui open={open} aria-labelledby="Dialog-Form--root" data-testid="DialogFormModal--root" maxWidth="md">
      <Box component="form" onSubmit={onSubmit} style={{ width: '25rem', paddingRight: '0.5rem' }} role="form">
        <DialogTitle title={title} subtitle={subtitle} onClose={handleOnClose} />
        <StyledDialogContent>{children}</StyledDialogContent>
        <DialogActions
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={handleOnCancel}
          isSubmitting={isSubmitting}
          disabled={!isValid || !dirty}
          confirmColor={confirmColor}
        />
      </Box>
    </DialogMui>
  );
};
