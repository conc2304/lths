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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { string, object } from 'yup';

import { PageDetail } from '@lths/features/mms/data-access';
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

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      is_variant: 'yes',
      default_page_id: '',
      description: '',
      page_id: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const getOptionLabel = (option: PageDetail) => (option ? `${option.name}` : '');
  const renderOption = (props: HTMLAttributes<HTMLLIElement>, data: PageDetail) => {
    return (
      <Box component="li" {...props} key={data.page_id}>
        <Typography>{data.name}</Typography>
      </Box>
    );
  };

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
          <Grid container spacing={2} paddingTop={1}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Page name"
                variant="outlined"
                fullWidth
                helperText={touched.name && errors.name}
                error={touched.name && Boolean(errors.name)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <FormLabel id="is_variant" sx={{ fontWeight: '500' }}>
                  Is this a variant?
                </FormLabel>
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
                  id="default_page_id"
                  fullWidth
                  sx={{ paddingY: 1 }}
                  options={defaultPages}
                  getOptionLabel={getOptionLabel}
                  renderOption={renderOption}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        error={touched.default_page_id && Boolean(errors.default_page_id)}
                        label="Variant default"
                        helperText={touched.default_page_id && errors.default_page_id}
                        InputProps={{
                          ...params.InputProps,
                          autoComplete: 'off',
                        }}
                      />
                    );
                  }}
                  onChange={(e, item) => setFieldValue('default_page_id', item?.page_id)}
                />
              )}
              {values.is_variant === 'yes' && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  paddingBottom={1}
                  paddingRight={1}
                  fontSize={'0.8rem'}
                  paddingLeft={1.5}
                  marginTop={'-0.2rem'}
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
          color="primary"
          onClick={() => handleSubmit()}
        >
          CREATE PAGE
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
