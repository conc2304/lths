import { useEffect, HTMLAttributes } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  TextField,
  Autocomplete,
  Box,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { string, object } from 'yup';

import { CreatePageRequest, useLazyGetDefaultPagesQuery } from '@lths/features/mms/data-access';

type CreatePageModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleCreate: (data: CreatePageRequest) => void;
  isLoading: boolean;
};

const validationSchema = object({
  name: string().required('Page name is required'),
  is_variant: string().required('Variant is required'),
  default_page_id: string().when('is_variant', {
    is: 'yes',
    then: (schema) => schema.required('Variant default is required'),
  }),
});

export const CreatePageModal = (props: CreatePageModalProps) => {
  const [getDefaultPage, { data: { data: defaultPages = [] } = {} }] = useLazyGetDefaultPagesQuery();
  const { isOpen, handleClose, handleCreate, isLoading } = props;

  const onSubmit = async (values: CreatePageRequest) => {
    const requestData = {
      ...values,
      default_page_id: values.is_variant === 'yes' ? values.default_page_id : null,
      is_variant: values.is_variant === 'yes',
    };
    handleCreate(requestData);
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
    getDefaultPage();
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h2">Create page</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <Grid container spacing={2} paddingTop={'24px'}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Page name"
                variant="outlined"
                fullWidth
                error={touched.name && Boolean(errors.name)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="name_helper_text">
                  {errors.name}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <FormLabel id="is_variant">Is this a variant?</FormLabel>
                <RadioGroup
                  name="is_variant"
                  aria-labelledby="is_variant"
                  row
                  value={values.is_variant}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio color="primary" />}
                    label="Yes"
                    sx={{ marginRight: 12 }}
                  />
                  <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {values.is_variant === 'yes' && (
                <Autocomplete
                  id="page_id"
                  fullWidth
                  sx={{ width: '396px', paddingY: '8px' }}
                  options={defaultPages}
                  getOptionLabel={(option) => (option ? `${option.name}` : '')}
                  renderOption={(props: HTMLAttributes<HTMLLIElement>, data) => {
                    return (
                      <Box component="li" {...props}>
                        <Typography>{data.name}</Typography>
                      </Box>
                    );
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Variant default"
                        InputProps={{
                          ...params.InputProps,
                          autoComplete: 'off', // disable autofill
                        }}
                      />
                    );
                  }}
                />
              )}
              {touched.default_page_id && errors.default_page_id && (
                <FormHelperText error id="name_helper_text">
                  {errors.default_page_id}
                </FormHelperText>
              )}
              {values.is_variant === 'yes' && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  paddingBottom={'8px'}
                  paddingRight={'8px'}
                  paddingLeft={'16px'}
                  fontSize={'0.8rem'}
                >
                  Cannot be changed once the page is created.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description (optional)"
                variant="outlined"
                fullWidth
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ marginBottom: 2 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ marginRight: 2 }}>
          CANCEL
        </Button>
        <LoadingButton
          loading={isLoading}
          disabled={isSubmitting}
          variant="contained"
          type="submit"
          color="primaryButton"
          onClick={() => handleSubmit()}
        >
          CREATE PAGE
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
