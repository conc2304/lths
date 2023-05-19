import React from 'react';
import {
  FormHelperText,
  Grid,
  Link,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import { ForgotPasswordRequest } from '@lths/shared/data-access';
import { useForgotPasswordMutation } from '@lths/shared/data-access';

import CenterCard from './center-card';

const ForgotPasswordForm: React.FC = (): JSX.Element => {
  const [success, setSuccess] = React.useState<boolean>(false); 

  const LoginDefaultValues: ForgotPasswordRequest = {
    email: '',
  };

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (values: ForgotPasswordRequest) => {
    try {
      const data = await forgotPassword(values).unwrap();
      // ToDo: remove this when email is added
      console.log("Remove when email on api call is added : password_reset_token : " + data.password_reset_token);
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CenterCard>
      <Typography variant="h2" color="primary" textAlign={'center'} mb={4}>
        Forgot Password?
      </Typography>
      {success ? (
        <Typography variant="body1" color="success.main" textAlign={'center'} mb={2}>
          Password reset email sent successfully! Please check your inbox.
        </Typography>
      ) : null}
      <Formik
        initialValues={LoginDefaultValues}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot-password">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-forgot-password"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter username address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-forgot-password">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Link variant="h6" component={RouterLink} to="/login" color="text.primary">
                    Go to Login
                  </Link>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  loading={isLoading}
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Send Reset Link
                </LoadingButton>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </CenterCard>
  );
};
export default ForgotPasswordForm;
