import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { string, object } from 'yup';

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
      <DialogTitle>Rename Page?</DialogTitle>
      <DialogContent>
        <form>
          <Stack spacing={1}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              error={touched.name && Boolean(errors.name)}
              fullWidth
              id="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              value={values.name}
            />
            {touched.name && errors.name && (
              <FormHelperText error id="name_helper_text">
                {errors.name}
              </FormHelperText>
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ marginBottom: 2 }}>
        <Button onClick={handleClose} variant="text" sx={{ marginRight: 1 }}>
          CANCEL
        </Button>
        <LoadingButton
          sx={{ fontWeight: 600 }}
          variant="text"
          loading={isLoading}
          disabled={isSubmitting}
          type="submit"
          onClick={() => handleSubmit()}
        >
          OK
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
