import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
  capitalize,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogForm } from '@lths/shared/ui-elements';

import { FeatureFlag } from '../../types';
import { generateFlagId } from '../../utils';

type CrudMode = 'create' | 'edit' | 'delete';
type FeatureFlagFormModalProps = {
  open: boolean;
  availableModules?: (string | number)[];
  formValues?: FeatureFlag | null;
  onClose?: () => void;
  onSubmit?: (flagData: FeatureFlag, mode: CrudMode) => void;
  mode?: CrudMode;
};

export const FeatureFlagFormModal = (props: FeatureFlagFormModalProps) => {
  const { open, availableModules = [], onClose, onSubmit, formValues = null, mode = 'create' } = props;

  const initialValues: FeatureFlag = {
    module: formValues?.module ?? '',
    title: formValues?.title ?? '',
    enabled: formValues?.enabled ?? false,
    description: formValues?.description ?? '',
    id: formValues?.id ?? '',
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
      const featureFlag = {
        ...values,
        id: formValues?.id ?? generateFlagId({ title: values.title, module: values.module }),
      };
      const method = mode;
      onSubmit && onSubmit(featureFlag, method);
      setSubmitting(false);
      handleCancel();
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    dirty,
    isValid,
    isSubmitting,
  } = formik;

  const handleCancel = () => {
    onClose && onClose();
    handleReset(initialValues);
  };

  const formTitleText = `${capitalize(mode)} Feature Flag`;
  const confirmText = `${capitalize(mode)} Flag`;

  return (
    <DialogForm
      open={open}
      title={formTitleText}
      cancelText="Cancel"
      confirmText={confirmText}
      onCancel={handleCancel}
      onClose={handleCancel}
      onReset={() => handleReset(initialValues)}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isValid={mode === 'delete' || isValid}
      dirty={mode === 'delete' || dirty}
      confirmColor={mode !== 'delete' ? 'primary' : 'error'}
    >
      <Box>
        <FormGroup>
          <FormControl sx={{ mb: 2, mt: 1 }}>
            <Autocomplete
              freeSolo
              autoSelect
              readOnly={['edit', 'delete'].includes(mode)}
              disabled={['edit', 'delete'].includes(mode)}
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
                error={touched.title && Boolean(errors.title)}
                aria-readonly={['edit', 'delete'].includes(mode)}
                disabled={['edit', 'delete'].includes(mode)}
                fullWidth
              />
              <FormControlLabel
                color="secondary"
                control={
                  <Checkbox
                    checked={values.enabled}
                    onChange={handleChange}
                    color="secondary"
                    readOnly={mode === 'delete'}
                  />
                }
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
      {mode === 'create' && (
        <Typography variant="caption">
          <strong>Note:</strong> For new flags to work there will have to be updates to the code to implement them.
        </Typography>
      )}
      <Typography variant="caption" display={'block'} mt={2}>
        <strong>Code ID: </strong>
        <span>
          <pre style={{ width: 'auto', display: 'inline-block', marginLeft: '6px' }}>
            {generateFlagId({ title: values.title, module: values.module })}{' '}
          </pre>
        </span>
      </Typography>
    </DialogForm>
  );
};
