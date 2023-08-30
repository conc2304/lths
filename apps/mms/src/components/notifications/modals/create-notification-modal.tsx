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
import { useNotificationTopics } from '@lths-mui/features/mms/ui-notifications';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { NotificationType } from '@lths/features/mms/data-access';

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

  console.log('create notify modal', notificationData);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting } = useFormik({
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

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h2">{isEdit ? `Edit` : `Create`} notification</Typography>
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
                  error={touched.topics && Boolean(errors.topics)}
                  fullWidth
                  id="topics"
                  name="topics"
                  onBlur={handleBlur}
                  type="text"
                  value={values.topics}
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

                {touched.topics && errors.topics && (
                  <FormHelperText error id="topic_helper_text">
                    {errors.topics}
                  </FormHelperText>
                )}
              </FormControl>
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
