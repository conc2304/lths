import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { LoginRequest } from '@lths/shared/data-access';
import { useLoginMutation, useLazyGetUserQuery } from '@lths/shared/data-access';

import CenterCard from './center-card';

const LoginForm: React.FC = (): JSX.Element => {
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
        Mobile Management System
      </Typography>

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
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
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
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
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
                    sx={{
                      '& input::-ms-reveal, & input::-ms-clear': {
                        display: 'none', // remove default edge visibility icon
                      },
                    }}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={checked}
                        // onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="/forgot-password" color="text.primary">
                    Forgot Password?
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
                  Login
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
export default LoginForm;
