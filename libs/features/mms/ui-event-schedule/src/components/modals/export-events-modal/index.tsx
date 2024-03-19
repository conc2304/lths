import { Box, FormControlLabel, Radio, RadioGroup, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogForm } from '@lths/shared/ui-elements';

type ExportFormats = 'csv' | 'pdf' | null;
type ExportEventsModalProps = {
  open: boolean;
  onClose: () => void;
  onExportEvents: (values: ExportFormats) => void;
};

export const ExportEventsModal = (props: ExportEventsModalProps) => {
  const { open, onClose, onExportEvents } = props;

  const formik = useFormik({
    initialValues: {
      fileFormat: null,
    },
    validationSchema: Yup.object().shape({
      fileFormat: Yup.string().test('null-check', 'File format must be selected.', (value) => {
        return value !== null;
      }),
    }),
    onSubmit: (values, { setSubmitting }) => {
      onExportEvents(values.fileFormat);
      setSubmitting(false);
      onClose();
    },
    validateOnMount: true,
    validateOnChange: true,
    onReset: () => {
      onClose();
    },
  });

  const labelTypograhySx: SxProps<Theme> = {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.15px',
    color: (theme) => theme.palette.text.secondary,
  };

  return (
    <DialogForm
      open={open}
      aria-label="Export Calendar Events"
      title="Export events"
      onClose={() => formik.handleReset(formik.values)}
      cancelText="CANCEL"
      confirmText="EXPORT"
      disabled={!formik.isValid}
      isSubmitting={formik.isSubmitting}
      onSubmit={formik.handleSubmit}
      hasCloseButton
    >
      <Box>
        <Typography variant="subtitle2">Format</Typography>
        <RadioGroup
          aria-labelledby="Export-Events--format-radio-group"
          name="fileFormat"
          value={formik.values.fileFormat}
          onChange={formik.handleChange}
        >
          <FormControlLabel
            value="csv"
            control={<Radio color="default" sx={{ py: 0 }} />}
            label="CSV (comma separated value, good for Excel)"
            sx={{ ...labelTypograhySx, mb: '0.5rem' }}
          />
          <FormControlLabel
            value="pdf"
            control={<Radio color="default" sx={{ py: 0 }} />}
            label="PDF (portable document format)"
            sx={labelTypograhySx}
          />
        </RadioGroup>
      </Box>
    </DialogForm>
  );
};
