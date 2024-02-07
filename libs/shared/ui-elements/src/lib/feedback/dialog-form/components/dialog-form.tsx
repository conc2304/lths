import { ReactNode } from 'react';
import { Dialog as DialogMui, Box, styled, DialogContent } from '@mui/material';
import { useFormik } from 'formik';

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
  formikValues: ReturnType<typeof useFormik>;
  onCancel?: () => void;
  onClose?: () => void;
};

export const DialogForm = (props: DialogFormProps) => {
  const { open, title, subtitle, cancelText, confirmText, formikValues: formik, children, onCancel, onClose } = props;

  const handleOnCancel = () => {
    onCancel && onCancel();
    formik.handleReset(formik.initialValues);
  };

  const handleOnClose = () => {
    onClose && onClose();
    formik.handleReset(formik.initialValues);
  };

  return (
    <DialogMui open={open} aria-labelledby="Dialog-Form--root" className="EventForm--Dailog" maxWidth="md">
      <Box component="form" onSubmit={formik.handleSubmit} style={{ width: '25rem', paddingRight: '0.5rem' }}>
        <DialogTitle title={title} subtitle={subtitle} onClose={handleOnClose} />
        <StyledDialogContent>{children}</StyledDialogContent>
        <DialogActions
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={handleOnCancel}
          isSubmitting={formik.isSubmitting}
          disabled={!formik.isValid}
        />
      </Box>
    </DialogMui>
  );
};
