import { Autocomplete, Box, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogForm } from '@lths/shared/ui-elements';
import { slugify } from '@lths/shared/utils';

import { FeatureFlag } from './type';

type FeatureFlagFormModalProps = {
  open: boolean;
  availableModules?: (string | number)[];
  formValues?: FeatureFlag;
  onClose?: () => void;
  onSubmit?: (flagData: FeatureFlag, method: 'edit' | 'create') => void;
};

export const FeatureFlagFormModal = (props: FeatureFlagFormModalProps) => {
  const { open, availableModules = [], onClose, onSubmit, formValues = null } = props;

  const isNewFeature = Boolean(formValues);

  const initialValues = {
    module: formValues?.module ?? '',
    title: formValues?.title ?? '',
    enabled: formValues?.enabled ?? false,
    description: formValues?.description ?? '',
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
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit(values, { setSubmitting }) {
      // todo clean up values
      const featureFlag = { ...values, id: formValues?.id ?? slugify(values.title) };
      const method = isNewFeature ? 'create' : 'edit';
      onSubmit && onSubmit(featureFlag, method);
      setSubmitting(false);
      handleCancel();
    },
  });

  const { values, handleChange, handleBlur, handleReset, setFieldValue, touched, errors } = formik;

  const handleCancel = () => {
    onClose && onClose();
    handleReset(initialValues);
  };

  const formTitleText = `${formValues !== null ? 'Add New' : 'Edit'} Feature Flag`;

  return (
    <DialogForm
      open={open}
      title={formTitleText}
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
              onBlur={handleBlur}
              onChange={(_, newValue: string | null) => {
                setFieldValue('module', newValue ?? '');
              }}
              renderOption={(props, option) => <li {...props}>{option}</li>}
              color="secondary"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Feature Module"
                  onBlur={handleBlur}
                  helperText={touched.module && errors.module}
                  color="secondary"
                  // color={touched.module && Boolean(errors.module) ? 'error' : 'primary'}
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
                onBlur={handleBlur}
                helperText={touched.title && errors.title}
                color="secondary"
                // color={touched.title && Boolean(errors.title) ? 'error' : 'primary'}
                error={touched.title && Boolean(errors.title)}
                fullWidth
              />
              <FormControlLabel
                color="secondary"
                control={<Checkbox checked={values.enabled} onChange={handleChange} color="secondary" />}
                label="Enabled"
                labelPlacement="start"
                name="enabled"
                onBlur={handleBlur}
                onChange={handleChange}
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
              onBlur={handleBlur}
              helperText={touched.description && errors.description ? errors.description : ''}
              color="secondary"
              error={touched.description && Boolean(errors.description)}
            />
          </FormControl>
        </FormGroup>
      </Box>
    </DialogForm>
  );
};
