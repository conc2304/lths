import { useEffect, HTMLAttributes } from 'react';
import {
  Dialog,
  DialogContent,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  TextField,
  Autocomplete,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import { string, object } from 'yup';

import { PageDetail } from '@lths/features/mms/data-access';
import { CreatePageRequest, useLazyGetDefaultPagesQuery } from '@lths/features/mms/data-access';
import { DialogActions, DialogTitle } from '@lths/shared/ui-elements';

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

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, setFieldValue, resetForm } = useFormik({
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

  const onClose = () => {
    handleClose();
    resetForm();
  }

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
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle title="Create page" onClose={onClose}/>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ paddingBottom: 3, paddingTop: 1 }}>
            <Typography variant="overline" style={{ lineHeight: 1.33, margin: 0 }}>Page</Typography>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              helperText={touched.name && errors.name}
              error={touched.name && Boolean(errors.name)}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
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
          </Stack>
          <Stack spacing={2}>
            <Typography variant="overline" style={{ lineHeight: 1.33, margin: 0 }}>Variant</Typography>
            <Stack spacing={1.5}>
              <FormLabel id="is_variant" sx={{ fontSize: 14, fontWeight: '500' }}>
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
                  value="yes" label="Yes"
                  control={<Radio color="default" sx={{ p: 0, marginRight: 1 }} />}
                  sx={{ paddingLeft: 1.125, marginRight: 3.75 }}
                />
                <FormControlLabel 
                  value="no" label="No" 
                  control={<Radio color="default" sx={{ p: 0, marginRight: 1 }} />} 
                />
              </RadioGroup>
            </Stack>
            <div>
              {values.is_variant === 'yes' && (
                <Autocomplete
                  id="default_page_id"
                  fullWidth
                  size="small"
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
                  variant="caption" color="text.secondary"
                  sx={{ paddingX: 1.75, paddingTop: 0.375 }}
                >
                  Cannot be changed once the page is created.
                </Typography>
              )}
            </div>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions
        confirmText={'Create'}
        onCancel={onClose}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onConfirm={() => handleSubmit()}
      />
    </Dialog>
  );
};
