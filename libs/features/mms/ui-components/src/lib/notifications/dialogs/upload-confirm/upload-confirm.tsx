import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogForm, FileList } from '@lths/shared/ui-elements';
import { humanFileSize } from '@lths/shared/utils';

type UploadConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  files: File[] | null;
  onSubmit: (files: File[]) => Promise<void>;
};
export const UploadConfirmDialog = (props: UploadConfirmDialogProps) => {
  console.log('UploadConfirmDialog');
  const { open, onClose, files: filesProp, onSubmit } = props;
  const maxUploadSizeMB = 100;
  const maxUploadQty = 10;

  const getTotalUploadSize = (files: File[]) => Array.from(files).reduce((acc, file) => acc + file.size, 0);

  const initialValues: { files: File[] | null } = {
    files: filesProp,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Formik onsubmit');
      if (!values.files) return;
      setSubmitting(true);
      console.log('Formik onsubmit');
      await onSubmit(values.files);
      setSubmitting(false);
      onClose();
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      files: Yup.mixed()
        .test('null-check', 'No files uploaded.', (values) => values !== null)
        .test('max-files', 'Maximum of 10 files', (values) => {
          return Array.from(values as File[]).length <= maxUploadQty;
        })
        .test('max-files-size', 'Maximum upload size of 100mb', (values) => {
          const bytesInMB = 1000000;
          const totalBytes = getTotalUploadSize(values as File[]);
          return totalBytes < maxUploadSizeMB * bytesInMB;
        }),
    }),
    onReset: () => {
      onClose();
    },
  });

  const files = formik.values.files;

  const handleRemoveFile = (index: number) => {
    const files = formik.values.files;
    console.log('handleRemoveFile');
    if (!files) {
      console.log('no files');
      return;
    }

    console.log(index);
    const dt = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file);
    }
    console.log(dt);

    formik.setFieldValue('files', dt.files);
    formik.validateField('files');
  };

  const totalFileSizeBytes = getTotalUploadSize(files);
  const formattedFileSize = humanFileSize(totalFileSizeBytes);
  console.log(formik.errors.files);

  return (
    <DialogForm
      title="Files to upload"
      open={open}
      onClose={() => formik.handleReset({ files: null })}
      confirmText="Upload"
      hasCloseButton
      isSubmitting={formik.isSubmitting}
      disabled={!formik.isValid}
      onSubmit={formik.handleSubmit}
    >
      <Box sx={{ display: 'fex', justifyContent: 'space-between' }}>
        <Typography>Total Files: {files?.length}</Typography>
        <Typography>Total Size: {formattedFileSize}</Typography>
      </Box>
      {Boolean(formik.errors.files) && <Typography color="error">{formik.errors.files as string}</Typography>}
      <FileList files={formik.values.files} filesRemovable onRemoveFile={handleRemoveFile} maxHeight={'15rem'} />
    </DialogForm>
  );
};
