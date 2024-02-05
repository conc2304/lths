import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FeatureFlag } from './type';

type AddFlagModalProps = {
  open: boolean;
  availableModules?: (string | number)[];
  onClose?: () => void;
  onSubmit?: (flagData: FeatureFlag) => void;
};
export const AddFlagModal = (props: AddFlagModalProps) => {
  const { open, availableModules = [], onClose, onSubmit } = props;

  const initialValues = {
    module: '',
    title: '',
    enabled: false,
    description: '',
  };

  const validationSchema = Yup.object().shape({
    module: Yup.string().min(4, 'Too Short').required('Required'),
    title: Yup.string().min(4, 'Too Short').required('Required'),
    description: Yup.string().min(15, 'Too Short').required('Required'),
    enabled: Yup.boolean(),
  });

  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    setFieldValue,
    dirty,
    touched,
    errors,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit(values, { setSubmitting }) {
      // todo clean up values
      onSubmit && onSubmit(values);
      setSubmitting(false);
    },
  });

  console.log({ errors, values });

  const handleCancel = () => {
    onClose && onClose();
    handleReset(initialValues);
  };

  return (
    <Dialog open={open} maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>Add New Feature Flag</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl sx={{ mb: 2, mt: 1 }}>
              <Autocomplete
                freeSolo
                value={values.module}
                options={availableModules.map((m) => m.toString())}
                onChange={(_, newValue: string | null) => {
                  setFieldValue('module', newValue ?? '');
                }}
                renderOption={(props, option) => <li {...props}>{option}</li>}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Feature Module"
                    // helperText={(touched.module && errors.module) || ' '}
                    helperText={'Module error'}
                    color={touched.module && Boolean(errors.module) ? 'error' : 'primary'}
                    error={touched.module && Boolean(errors.module)}
                  />
                )}
              />
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={8}>
                <TextField
                  label="Title"
                  aria-label="Title"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                  helperText={(touched.title && errors.title) || ' '}
                  color={touched.title && Boolean(errors.title) ? 'error' : 'primary'}
                  error={touched.title && Boolean(errors.title)}
                  fullWidth
                />
                <FormControlLabel
                  control={<Checkbox checked={values.enabled} onChange={handleChange} />}
                  label="Enabled"
                  labelPlacement="start"
                  name="enabled"
                />
              </Stack>
            </FormControl>
            <FormControl sx={{ mb: 2 }}>
              <TextField
                label="Description"
                name="description"
                value={values.description}
                multiline
                aria-multiline
                onChange={handleChange}
                helperText={touched.description && errors.description ? errors.description : ''}
                // color={touched.description && Boolean(errors.description) ? 'error' : 'primary'}
                error={touched.description && Boolean(errors.description)}
              />
            </FormControl>
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 1.5 }}>
        <Button onClick={handleCancel} variant="outlined" sx={{ fontWeight: 600 }} color="primary">
          CANCEL
        </Button>
        <LoadingButton
          aria-label="Save new feature flag"
          color="primary"
          disabled={isSubmitting || !isValid || !dirty}
          loading={isSubmitting}
          // onClick={() => setModalOpen(false)}
          sx={{ fontWeight: 600 }}
        >
          ADD
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
