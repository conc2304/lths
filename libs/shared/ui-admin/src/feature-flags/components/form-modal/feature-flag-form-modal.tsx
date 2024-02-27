import { useState } from 'react';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Zoom,
  capitalize,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogForm } from '@lths/shared/ui-elements';
import { capitalizeString } from '@lths/shared/utils';

import { FeatureFlag, FlagCRUDMethods } from '../../types';
import { generateFlagId } from '../../utils';

type FormError = { field: keyof FeatureFlag | 'form'; msg: string };
type FormStatusError = { errors: FormError[] };

type FeatureFlagFormModalProps = {
  open: boolean;
  availableModules?: (string | number)[];
  formValues?: FeatureFlag | null;
  onClose?: () => void;
  onSubmit?: (flagData: FeatureFlag, mode: FlagCRUDMethods) => void | Promise<FormStatusError | void>;
  mode?: FlagCRUDMethods;
};

export const FeatureFlagFormModal = (props: FeatureFlagFormModalProps) => {
  const { open, availableModules = [], onClose, onSubmit, formValues = null, mode = 'create' } = props;

  const theme = useTheme();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState<'Copy to Clipboard' | 'Copied!'>('Copy to Clipboard');

  const initialValues: FeatureFlag = {
    module: formValues?.module ?? '',
    title: formValues?.title ?? '',
    enabled: formValues?.enabled ?? false,
    description: formValues?.description ?? '',
    id: formValues?.id ?? '',
  };

  const initialStatus: FormStatusError = {
    errors: [],
  };

  const validationSchema = Yup.object().shape({
    module: Yup.string().min(4, 'Too Short').required('Required'),
    title: Yup.string().min(4, 'Too Short').required('Required'),
    description: Yup.string().min(10, 'Too Short').required('Required'),
    enabled: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues,
    initialStatus,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,

    onSubmit(values, { setSubmitting, setStatus, setFieldError }) {
      const featureFlag = {
        ...values,
        id: formValues?.id ?? generateFlagId({ title: values.title, module: values.module }),
      };
      const method = mode;
      if (!onSubmit) {
        return setSubmitting(false);
      }

      const result = onSubmit(featureFlag, method);
      if (result instanceof Promise) {
        result
          .catch((e: FormStatusError) => {
            setStatus({ errors: e.errors.filter((e) => e.field === 'form') });
            e.errors.forEach(({ field, msg }) => {
              if (field === 'form') return;
              setFieldError(field, msg);
            });
          })
          .finally(() => setSubmitting(false));
      } else {
        setSubmitting(false);
        handleCancel();
      }
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
    status,
  } = formik;

  const handleCancel = () => {
    onClose && onClose();
    handleReset(initialValues);
  };

  const flagDevCode = generateFlagId({ title: values.title, module: values.module });

  const handleOnCodeClick = () => {
    navigator.clipboard.writeText(flagDevCode);
    setTooltipText('Copied!');
    setTooltipOpen(false);
  };

  const handleShowTooltip = () => {
    setTooltipText('Copy to Clipboard');
    setTooltipOpen(true);
  };

  const formTitleText = `${capitalize(mode)} Feature Flag`;
  const confirmText = `${capitalize(mode)} Flag`;

  const readOnlyFields: Record<keyof FeatureFlag, FlagCRUDMethods[]> = {
    module: ['delete', 'update'],
    title: ['delete', 'update'],
    description: ['delete'],
    enabled: ['delete'],
    id: [],
  };

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
              readOnly={readOnlyFields.module.includes(mode)}
              disabled={readOnlyFields.module.includes(mode)}
              value={values.module}
              options={availableModules.map((m) => m.toString())}
              onBlur={handleBlur}
              onChange={(_, newValue: string | null) => {
                // force formatting so that we don't end up with a variety
                // of modules that are the same but with different formatting

                const capitalizedValue = capitalizeString(newValue ?? '');
                setFieldValue('module', capitalizedValue);
              }}
              renderOption={(props, option) => <li {...props}>{option}</li>}
              color="secondary"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Feature Module"
                  onBlur={handleBlur}
                  placeholder="Select a module or add a new one"
                  helperText={touched.module && errors.module}
                  color="secondary"
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
                value={values.title.toUpperCase()}
                name="title"
                onChange={(e) => {
                  const formattedTitle = (e?.target?.value ?? '').toUpperCase();
                  setFieldValue('title', formattedTitle);
                }}
                onBlur={handleBlur}
                helperText={touched.title && errors.title}
                color="secondary"
                error={touched.title && Boolean(errors.title)}
                aria-readonly={readOnlyFields.title.includes(mode)}
                disabled={readOnlyFields.title.includes(mode)}
                fullWidth
              />
              <FormControlLabel
                color="secondary"
                label="Enabled"
                labelPlacement="start"
                name="enabled"
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={readOnlyFields.enabled.includes(mode)}
                control={<Checkbox checked={values.enabled} onChange={handleChange} color="secondary" />}
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
              disabled={readOnlyFields.description.includes(mode)}
            />
          </FormControl>
        </FormGroup>
      </Box>
      {mode === 'create' && (
        <Typography variant="caption">
          <strong>Note:</strong> For new flags to work there will have to be updates to the code to implement them.
        </Typography>
      )}

      {mode === 'delete' && (
        <Typography variant="caption" color="error">
          <strong>Note:</strong> If this flag is being used in code, it could prevent that feature from being accessed
          by all users.
        </Typography>
      )}
      <Typography variant="caption" display={'block'} mt={2}>
        <strong>Developer Code ID: </strong>
        <Tooltip
          title={tooltipText}
          onClick={handleOnCodeClick}
          placement="top"
          open={tooltipOpen}
          TransitionComponent={Zoom}
          TransitionProps={{
            easing: { exit: tooltipText === 'Copied!' ? 'cubic-bezier(.5,-0.32,.73,.65)' : undefined },
            timeout: {
              enter: theme.transitions.duration.enteringScreen,
              exit: tooltipText === 'Copied!' ? 700 : theme.transitions.duration.leavingScreen, // slow down the exit so that we see the "Copied!" text
            },
          }}
          onMouseEnter={handleShowTooltip}
          onMouseOut={() => setTooltipOpen(false)}
        >
          <span>
            <Box
              component="pre"
              sx={{
                width: 'auto',
                display: 'inline-block',
                ml: '6px',
                cursor: 'pointer',
                backgroundColor: (theme) => theme.palette.grey[200],
                px: 0.75,
                py: 0.5,
                borderRadius: '4px',
              }}
            >
              {flagDevCode}
            </Box>
          </span>
        </Tooltip>
      </Typography>
      {status?.errors?.length > 0 && (
        <>
          <List>
            {status?.errors.map((e: FormError) => (
              <ListItem>
                <Typography color="error" align="center">
                  {e.msg}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Typography color={'error'} align="center">
            Please try again.
          </Typography>
        </>
      )}
    </DialogForm>
  );
};
