import { ReactNode } from 'react';
import {
  Dialog as DialogMui,
  Box,
  DialogContent,
  DialogProps,
  DialogContentProps,
  DialogActionsProps,
  DialogTitleProps,
} from '@mui/material';

import { DialogActions } from './dialog-action';
import { DialogTitle } from './dialog-title';
import { ColorThemeMui } from '../../../types';

type DialogFormProps = {
  open: boolean;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  confirmColor?: ColorThemeMui;
  onClose?: () => void; // use to handle cancel too
  onSubmit?: () => void;
  // isSubmitting and isLoading handle the same thing, just different words for different uses
  isSubmitting?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
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
    // onCancel,
    onClose,
    // onReset,
    onSubmit,
    isSubmitting,
    isLoading,
    disabled,
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

  const handleOnClose = () => {
    onClose && onClose();
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
            onClose={hasCloseButton && onClose ? handleOnClose : undefined}
            slotProps={{ DialogTitle: DialogTitleProps }}
          />
        )}
        <DialogContent {...DialogContentProps}>{children}</DialogContent>
        <DialogActions
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={handleOnClose}
          isSubmitting={isSubmitting || isLoading}
          disabled={disabled}
          confirmColor={confirmColor}
          destructive={destructive}
          slotProps={{ DialogActions: DialogActionsProps }}
        />
      </Box>
    </DialogMui>
  );
};
