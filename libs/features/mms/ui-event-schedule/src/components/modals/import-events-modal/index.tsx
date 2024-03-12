import { Box, Dialog, DialogContent, Link, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogActions, DialogTitle, DragDropFile } from '@lths/shared/ui-elements';

type ImportEventsModalProps = {
  open: boolean;
  onClose: () => void;
  onFilesAdded: (files: FileList) => void;
};

export const ImportEventsModal = (props: ImportEventsModalProps) => {
  const { open, onClose, onFilesAdded } = props;

  const initialValues: { files: FileList | null } = {
    files: null,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      if (!values.files) return;
      onFilesAdded(values.files);
      setSubmitting(false);
      onClose();
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      files: Yup.mixed().test('null-check', 'No files uploaded.', (values) => values !== null),
    }),
    onReset: () => {
      onClose();
    },
  });

  return (
    <Dialog open={open} aria-label="Import Calendar Events" onClose={onClose}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle
          title="Import event"
          subtitle={
            <Typography variant="body1" mt={2} sx={{ color: (theme) => theme.palette.text.secondary }}>
              Add events by uploading a CSV file.
            </Typography>
          }
          onClose={onClose}
        />
        <DialogContent>
          <DragDropFile
            fullWidth
            multiple
            showFilesAdded
            filesRemovable
            onFilesChanged={(files) => formik.setFieldValue('files', files)}
            files={formik.values.files}
            promptText="Drag and drop file here"
          />
          <Box sx={{ mt: 1.75 }}>
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.text.secondary }}>
              Review the{' '}
              <Link
                // TODO - Dont know where this is linking
                underline="hover"
                color={(theme) => theme.palette.primary.main}
                target="_blank"
                rel="noopener"
                aria-label="Visit the Data Format Template page to see what files formats are valid."
                sx={{ cursor: 'pointer' }}
              >
                data format template
              </Link>{' '}
              before uploading.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          cancelText="CANCEL"
          confirmText="IMPORT"
          onCancel={() => formik.handleReset(formik.values)}
          disabled={!formik.isValid}
          isSubmitting={formik.isSubmitting}
        />
      </Box>
    </Dialog>
  );
};
