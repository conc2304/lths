import { HTMLAttributes } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { useNotificationTopics } from '@lths-mui/features/mms/ui-notifications';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { EnumValue, NotificationType } from '@lths/features/mms/data-access';

import { CreateNotificationModalProps, NewNotificationRequest } from '../types';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  topics: yup.string().required('Topic is required'),
});

const CreateNotificationModal = (props: CreateNotificationModalProps) => {
  const { open, handleCloseModal, onCreateNotification, isEdit, notificationData, isResponseLoading } = props;

  const onSubmit = async (values: NewNotificationRequest) => {
    const requestData = {
      ...values,
      topics: [values.topics],
    };
    if (isEdit) requestData._id = notificationData._id;
    onCreateNotification(requestData);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      name: notificationData?.name || '',
      topics: notificationData?.topics[0] || '',
      description: notificationData?.description || '',
      type: NotificationType.PUSH_NOTIFICATION,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const { notificationTopics } = useNotificationTopics();

  const getTopicOptionLabel = (option: EnumValue) => (option ? option.name : '');

  const renderTopicOption = (props: HTMLAttributes<HTMLLIElement>, option: EnumValue) => {
    return (
      <Box component="li" {...props}>
        <Typography>{option.name}</Typography>
      </Box>
    );
  };

  const selectedTopic = notificationTopics.find((n) => n.value === values.topics) || null;

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography component="p" variant="h2">
          {isEdit ? `Edit` : `Create`} notification
        </Typography>
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
      <DialogActions sx={{ marginBottom: 2 }}>
        <Button onClick={handleCloseModal} variant="outlined" sx={{ marginRight: 2 }}>
          CANCEL
        </Button>
        <LoadingButton
          loading={isResponseLoading}
          disabled={isSubmitting}
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
        >
          {isEdit ? `UPDATE` : `CREATE`}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNotificationModal;
