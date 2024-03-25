import {
  Dialog,
  DialogContent,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { string, object } from 'yup';

import { DialogActions, DialogTitle } from '@lths/shared/ui-elements';

export type RenameData = {
  name: string;
};

type RenamePageModalProps = {
  isOpen: boolean;
  data: RenameData;
  handleClose: () => void;
  handleRename: (data: RenameData) => void;
  isLoading: boolean;
};

const validationSchema = object({
  name: string().required('Name is required'),
});

export const RenamePageModal = ({ isOpen, handleClose, handleRename, isLoading, data }: RenamePageModalProps) => {
  const onSubmit = async (values: RenameData) => {
    handleRename(values);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting } = useFormik({
    initialValues: {
      name: data.name || '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle title="Rename page"/>
      <DialogContent>
        <form>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            sx={{ marginTop: 1 }}
            fullWidth
            helperText={touched.name && errors.name}
            error={touched.name && Boolean(errors.name)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
        </form>
      </DialogContent>
      <DialogActions
        confirmText={'Rename'}
        onCancel={handleClose}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onConfirm={() => handleSubmit()}
      />
    </Dialog>
  );
};
