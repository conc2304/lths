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
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// ToDO: Switch login api call to forgot password api call
import { LoginRequest } from '@lths/shared/data-access';
import { useLoginMutation, useLazyGetUserQuery } from '@lths/shared/data-access';

import CenterCard from './center-card';

const ForgotPasswordForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const LoginDefaultValues: LoginRequest = {
    email: '',
    password: '',
  };

  const [login, { isLoading }] = useLoginMutation();

  const [getUser] = useLazyGetUserQuery();

  const onSubmit = async (values: LoginRequest) => {
    try {
      const data = await login(values).unwrap();
      const uid = data.user._id;
      const user2 = await getUser(uid);
      console.log(data, user2?.data);
      console.log('routing to next screen');
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CenterCard>
      <Typography variant="h2" color="primary" textAlign={'center'} mb={4}>
        Forgot Password?
      </Typography>

      <Formik
        initialValues={LoginDefaultValues}
        //validationSchema={validationSchema}
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
