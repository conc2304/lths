import React from 'react';
import {
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { LoginRequest } from '@lths/shared/data-access';
import { useLoginMutation, useLazyGetUserQuery } from '@lths/shared/data-access';

import CenterCard from './center-card';

const ResetPasswordForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const onShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const LoginDefaultValues: LoginRequest = {
    email: '',
    password: '',
  };
  const onMouseDownPassword = (event) => {
    event.preventDefault();
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
        Reset Password
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
                  <InputLabel htmlFor="password-confirm-reset-password">New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-reset-password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={onShowPasswordClick}
                          onMouseDown={onMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-reset-password">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-confirm-reset-password">New Password Confirmation</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-confirm-reset-password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={onShowPasswordClick}
                          onMouseDown={onMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-confirm-reset-password">
                      {errors.password}
                    </FormHelperText>
                  )}
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
                  Change Password
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
export default ResetPasswordForm;
