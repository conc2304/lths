import { Autocomplete, Box, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogForm } from '@lths/shared/ui-elements';

import { FeatureFlag } from './type';

type AddNewFlagModalProps = {
  open: boolean;
  availableModules?: (string | number)[];
  onClose?: () => void;
  onSubmit?: (flagData: FeatureFlag) => void;
};

export const AddNewFlagModal = (props: AddNewFlagModalProps) => {
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    // validateOnBlur: true,
    // validateOnChange: true,
    validateOnMount: true,
    onSubmit(values, { setSubmitting }) {
      // todo clean up values
      console.log(values);
      onSubmit && onSubmit(values);
      setSubmitting(false);
      handleCancel();
    },
  });

  const { values, handleChange, handleReset, setFieldValue, touched, errors } = formik;
  console.log({ errors, values });

  const handleCancel = () => {
    onClose && onClose();
    handleReset(initialValues);
  };

  // Object.keys(initialValues).forEach((key) => {
  //   console.log({
  //     [key]: {
  //       text: touched[key] && errors[key],
  //       error: touched[key] && Boolean(errors[key]),
  //     },
  //   });
  // });

  return (
    <DialogForm
      open={open}
      title="Add New Feature Flag"
      formikValues={formik}
      cancelText="Cancel"
      confirmText="Add Flag"
      onCancel={handleCancel}
      onClose={handleCancel}
    >
      <Box>
        <FormGroup>
          <FormControl sx={{ mb: 2, mt: 1 }}>
            <Autocomplete
              freeSolo
              autoSelect
              value={values.module}
              options={availableModules.map((m) => m.toString())}
              onChange={(_, newValue: string | null) => {
                console.log('change', newValue);
                setFieldValue('module', newValue ?? '');
              }}
              renderOption={(props, option) => <li {...props}>{option}</li>}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Feature Module"
                  helperText={touched.module && errors.module}
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
                helperText={touched.title && errors.title}
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
    </DialogForm>
  );
};
