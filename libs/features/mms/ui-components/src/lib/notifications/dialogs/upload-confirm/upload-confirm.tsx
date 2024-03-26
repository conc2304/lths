import { useEffect, useMemo, useState } from 'react';
import { Typography } from '@mui/material';
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
          console.log({ values });
          return true;
        })
        .test('max-files-size', 'Total file size over limit', (values) => {
          console.log({ values });
          return true;
        }),
    }),
    onReset: () => {
      console.log('reset');
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

  const totalFileSize = Array.from(files).reduce((acc, file) => acc + file.size, 0);
  console.log(totalFileSize, files?.length);

  // const errorMsg =
  //   (maxTotalSizeMB && totalFileSize > maxTotalSizeMB) || (maxFiles && files.length > maxFiles)
  //     ? 'Total number or size of files exceed maximium.'
  //     : null;

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
      <Typography>Total Files: {files?.length}</Typography>
      <Typography>Total Size: {humanFileSize(totalFileSize)}</Typography>
      {/* {errorMsg && <Typography>{errorMsg}</Typography>} */}
      <FileList files={formik.values.files} filesRemovable onRemoveFile={handleRemoveFile} maxHeight={'15rem'} />
    </DialogForm>
  );
};
