import { useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogForm, FileList } from '@lths/shared/ui-elements';

type UploadConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  files: FileList | null;
  onSubmit: (files: FileList) => Promise<void>;
};
export const UploadConfirmDialog = (props: UploadConfirmDialogProps) => {
  const { open, onClose, files: filesProp, onSubmit } = props;

  const files = useMemo(() => filesProp, [filesProp]);
  const initialValues: { files: FileList | null } = {
    files: files,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      if (!values.files) return;
      setSubmitting(true);
      await onSubmit(values.files);
      setSubmitting(false);
      onClose();
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      files: Yup.mixed().test('null-check', 'No files uploaded.', (values) => values !== null),
    }),
    onReset: () => {
      console.log('reset');
      onClose();
    },
  });

  const handleRemoveFile = (index: number) => {
    if (!files) return;

    console.log(index);
    const dt = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file);
    }
    console.log(dt);

    formik.setFieldValue('files', dt);
  };

  return (
    <DialogForm
      title="Files to upload"
      open={open}
      onClose={() => formik.handleReset({ files: null })}
      confirmText="Upload"
      hasCloseButton
      isSubmitting={formik.isSubmitting}
      disabled={!formik.isValid}
    >
      <FileList files={formik.values.files} filesRemovable onRemoveFile={handleRemoveFile} />
    </DialogForm>
  );
};
