import { HTMLAttributes, useEffect } from 'react';
import { Autocomplete, Box, Grid, TextField, Typography, DialogContent } from '@mui/material';
import { useFormik } from 'formik';
import { string, object } from 'yup';

import { EnumValue, NotificationType } from '@lths/features/mms/data-access';
import { DialogActions } from '@lths/shared/ui-elements';

import { NotificationFormProps } from '../../types';

const validationSchema = object({
  name: string().required('Name is required'),
  topics: string().required('Topic is required'),
});

const NotificationForm = ({
  notificationData,
  notificationTopics,
  setFormSubmitting,
  onSubmit,
  onCancel,
  isLoading,
  confirmButtonText,
}: NotificationFormProps) => {
  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      name: notificationData?.name || '',
      topics: notificationData?.data?.topics ? notificationData?.data?.topics[0] : '',
      description: notificationData?.description || '',
      type: NotificationType.PUSH_NOTIFICATION,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const getTopicOptionLabel = (option: EnumValue) => (option ? option.name : '');

  const renderTopicOption = (props: HTMLAttributes<HTMLLIElement>, option: EnumValue) => {
    return (
      <Box component="li" {...props}>
        <Typography>{option.name}</Typography>
      </Box>
    );
  };

  const selectedTopic = notificationTopics.find((n) => n.value === values.topics) || null;

  useEffect(() => {
    setFormSubmitting(isSubmitting);
  }, [isSubmitting]);

  return (
    <>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={touched.name && Boolean(errors.name)}
                fullWidth
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.name}
                label="Name"
                variant="outlined"
                size="small"
                helperText={touched.name && errors.name}
                sx={{ marginTop: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="topics"
                value={selectedTopic}
                options={notificationTopics}
                getOptionLabel={getTopicOptionLabel}
                renderOption={renderTopicOption}
                onChange={(e, item) => setFieldValue('topics', item?.value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Topic"
                    error={touched.topics && Boolean(errors.topics)}
                    helperText={touched.topics && errors.topics}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={touched.description && Boolean(errors.description)}
                fullWidth
                id="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.description}
                label="Description (optional)"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions
        confirmText={confirmButtonText}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onConfirm={() => handleSubmit}
        onCancel={onCancel}
      />
    </>
  );
};

export default NotificationForm;
