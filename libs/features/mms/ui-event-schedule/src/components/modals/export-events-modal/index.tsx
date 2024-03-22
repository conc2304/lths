import { Box, Dialog, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogActions, DialogTitle } from '@lths/shared/ui-elements';

import { FormLabel, StyledDialogContent } from '../utils';

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

  return (
    <Dialog open={open} aria-label="Export Calendar Events" maxWidth="md">
      <Box width={'24rem'}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <DialogTitle
            title="Export Events"
            subtitle="You can export the data on this page in a couple different formats. Choose .CSV to import your data into another program like Excel."
            onClose={() => formik.handleReset(formik.values)}
          />
          <StyledDialogContent>
            <FormLabel id="Export-Events--format-radio-group">Select Format</FormLabel>
            <RadioGroup
              aria-labelledby="Export-Events--format-radio-group"
              name="fileFormat"
              value={formik.values.fileFormat}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="csv" control={<Radio />} label=".CSV file" />
              <FormControlLabel value="pdf" control={<Radio />} label=".PDF file" />
            </RadioGroup>
          </StyledDialogContent>
          <DialogActions
            cancelText="CANCEL"
            confirmText="EXPORT EVENTS"
            disabled={!formik.isValid}
            onCancel={() => formik.handleReset(formik.values)}
            isSubmitting={formik.isSubmitting}
          />
        </Box>
      </Box>
    </Dialog>
  );
};
