import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  CreateNotificationRequest,
  NotificationType,
  useCreateNotificationMutation,
  useLazyGetEnumListQuery,
} from '@lths/features/mms/data-access';

import { CreateNotificationModalProps } from './types';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  topic: yup.string().required('Topic is required'),
});

const CreateNotificationModal = (props: CreateNotificationModalProps) => {
  const [createNotification, { isLoading }] = useCreateNotificationMutation();
  const [getEnumList] = useLazyGetEnumListQuery();
  const [notificationTopics, setNotificationTopics] = useState([]);
  const { open, handleCloseModal, onCreateNotification } = props;

  const onSubmit = async (values: CreateNotificationRequest) => {
    const requestData = {
      ...values,
    };
    const response = await createNotification(requestData).unwrap();
    onCreateNotification(response?.data?._id);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting } = useFormik({
    initialValues: {
      name: '',
      topic: '',
      description: '',
      type: NotificationType.PUSH_NOTIFICATION,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const fetchNotificationTopics = async () => {
    try {
      const response = await getEnumList('NotificationTopics').unwrap();
      if (response?.success) setNotificationTopics(response?.data?.enum_values);
    } catch (error) {
      console.error(`Error in fetching notification topics`);
    }
  };

  useEffect(() => {
    fetchNotificationTopics();
  }, []);

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h2">Create notification</Typography>
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
                helperText={errors.name}
                sx={{ marginTop: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Topic</InputLabel>
                <Select
                  label="Topic"
                  onChange={handleChange}
                  error={touched.topic && Boolean(errors.topic)}
                  fullWidth
                  id="topic"
                  name="topic"
                  onBlur={handleBlur}
                  type="text"
                  value={values.topic}
                  variant="outlined"
                >
                  {notificationTopics.map((nt) => {
                    const { name, value } = nt;
                    return (
                      <MenuItem key={value} value={value}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>

                {touched.topic && errors.topic && (
                  <FormHelperText error id="topic_helper_text">
                    {errors.topic}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={touched.description && Boolean(errors.description)}
                fullWidth
                id="name"
                name="name"
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
          loading={isLoading}
          disabled={isSubmitting}
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
        >
          CREATE
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNotificationModal;
