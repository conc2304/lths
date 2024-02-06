import { Box, Dialog, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DragDropFile } from '@lths/shared/ui-elements';

import { CalendarDialogActions } from '../dialog-actions';
import { CalendarDialogTitle } from '../dialog-title';
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
    <Dialog open={open} aria-label="Import Calendar Events" maxWidth="md">
      <Box width={'24rem'}>
        <form onSubmit={formik.handleSubmit}>
          <CalendarDialogTitle
            title="Import Events"
            subtitle={
              <>
                You can add events to the schedule by uploading a CSV file to the system.
                <br />
                <br />
                Check the{' '}
                <Link
                  // TODO - Dont know where this is linking
                  underline="hover"
                  color={(theme) => theme.palette.secondary.main}
                  target="_blank"
                  rel="noopener"
                  aria-label="Visit the Data Format Template page to see what files formats are valid."
                >
                  data format template
                </Link>{' '}
                before uploading your file.
              </>
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
            />
          </StyledDialogContent>
          <CalendarDialogActions
            cancelText="CANCEL"
            confirmText="IMPORT EVENTS"
            onCancel={() => formik.handleReset(formik.values)}
            disabled={!formik.isValid}
            isSubmitting={formik.isSubmitting}
          />
        </form>
      </Box>
    </Dialog>
  );
};
