import { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { CreatePageRequest, useCreatePageMutation, useLazyGetDefaultPagesQuery } from '@lths/features/mms/data-access';

import { CreatePageModalProps } from './types';

const validationSchema = yup.object({
  name: yup.string().required('Page name is required'),
  is_variant: yup.string().required('Variant is required'),
  default_page_id: yup.string().when('is_variant', (is_variant, schema) => {
    if (is_variant.includes('yes')) {
      return schema.required('Variant default is required');
    }
  }),
});

const CreatePageModal = (props: CreatePageModalProps) => {
  const [getDefaultPage, { data: { data: defaultPages = [] } = {} }] = useLazyGetDefaultPagesQuery();
  const [createPage, { isLoading }] = useCreatePageMutation();
  const { open, handleCloseModal, onCreatePage } = props;

  const onSubmit = async (values: CreatePageRequest) => {
    const requestData = {
      ...values,
      default_page_id: values.is_variant === 'yes' ? values.default_page_id : null,
      is_variant: values.is_variant === 'yes',
    };
    const response = await createPage(requestData).unwrap();
    onCreatePage(response?.data?.page_id);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting } = useFormik({
    initialValues: {
      name: '',
      is_variant: 'yes',
      default_page_id: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    getDefaultPage({});
  }, []);

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h2">Create new page</Typography>
        <Typography variant="body2">All text fields required unless noted.</Typography>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon fontSize="large" sx={{ stroke: 'white', strokeWidth: 1 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name">PAGE NAME</InputLabel>
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
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="is_variant">IS THIS A VARIANT?</InputLabel>
                <RadioGroup name="is_variant" id="is_variant" row value={values.is_variant} onChange={handleChange}>
                  <FormControlLabel
                    value="yes"
                    control={<Radio color="primary" />}
                    label="YES"
                    sx={{ marginRight: 12 }}
                  />
                  <FormControlLabel value="no" control={<Radio color="primary" />} label="NO" />
                </RadioGroup>
              </Stack>
            </Grid>
            {values.is_variant === 'yes' && (
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="default_page_id">VARIANT DEFAULT</InputLabel>
                  <Select
                    error={touched.default_page_id && Boolean(errors.default_page_id)}
                    id="default_page_id"
                    name="default_page_id"
                    onChange={handleChange}
                    value={values.default_page_id}
                    displayEmpty
                  >
                    <MenuItem value="">Page selector dropdown</MenuItem>
                    {defaultPages.map(({ page_id, name }) => (
                      <MenuItem id={page_id} value={page_id} key={`page_${page_id}`}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.default_page_id && errors.default_page_id && (
                    <FormHelperText error id="is_variant_helper_text">
                      {errors.default_page_id}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            )}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="description">DESCRIPTION (optional)</InputLabel>
                <OutlinedInput
                  fullWidth
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="description"
                  name="description"
                  multiline
                  rows={4}
                />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ marginBottom: 2 }}>
        <Button onClick={handleCloseModal} variant="outlined" sx={{ marginRight: 2 }}>
          CANCEL
        </Button>
        <LoadingButton
          loading={isLoading}
          disabled={isSubmitting}
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
        >
          CREATE PAGE
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePageModal;
