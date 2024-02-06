import { ReactNode } from 'react';
import {
  Dialog as DialogMui,
  Box,
  InputLabel,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
  Select,
  FormHelperText,
  styled,
  DialogContent,
} from '@mui/material';
import { FormikValues } from 'formik';

import { pxToRem } from '@lths/shared/utils';

const StyledDialogContent = styled(DialogContent)(() => ({
  padding: pxToRem(24),
}));

type DialogFormProps = {
  open: boolean;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  formikValues: FormikValues;
};

export const DialogForm = (props: DialogFormProps) => {
  const { open, title, subtitle, cancelText, confirmText, formikValues: formik, children } = props;

  return (
    <DialogMui open={open} aria-labelledby="edit-event-dialog-title" className="EventForm--Dailog" maxWidth="md">
      <Box component="form" onSubmit={formik.handleSubmit} style={{ width: '25rem', paddingRight: '0.5rem' }}>
        <CalendarDialogTitle
          title={title}
          subtitle={subtitle}
          onClose={() => formik.handleReset(formik.initialValues)}
        />
        <StyledDialogContent>{children && children}</StyledDialogContent>
        <CalendarDialogActions
          data-testid="Edit-Event--actions-wrapper"
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={() => formik.handleReset(formik.values)}
          isSubmitting={formik.isSubmitting}
          disabled={!formik.isValid}
        />
      </Box>
    </DialogMui>
  );
};
