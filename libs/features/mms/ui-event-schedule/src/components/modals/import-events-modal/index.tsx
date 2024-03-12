import { Box, Dialog, Link, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogActions, DialogTitle, DragDropFile } from '@lths/shared/ui-elements';

import { StyledDialogContent } from '../utils';

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
    <Dialog
      open={open}
      aria-label="Import Calendar Events"
      // maxWidth="lg"
      // sx={{ width: '27.75em' }}
      onClose={onClose}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle
          title="Import event"
          subtitle={
            <Typography variant="body1" mt={2}>
              Add events by uploading a CSV file.
            </Typography>
          }
          onClose={onClose}
        />
        <StyledDialogContent>
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
            <Typography variant="caption">
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
        </StyledDialogContent>
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
