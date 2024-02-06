import React, { useLayoutEffect, useRef } from 'react';
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
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppSelector } from '@lths/features/mms/data-access';
import { LoginRequest, removeAuthTokenFromStorage } from '@lths/shared/data-access';
import { useLoginMutation, useLazyGetUserQuery } from '@lths/shared/data-access';

import CenterCard from './center-card';

const LoginForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const auth = useAppSelector((state) => state.auth);
  const inputRef = useRef<HTMLInputElement>(null);

  const [login, { isLoading }] = useLoginMutation();
  const [getUser] = useLazyGetUserQuery();

  useLayoutEffect(() => {
    const authauthenticated = auth;
    if (authauthenticated) {
      // the async on submit screws with the render cycle of useNavigate
      // so we we navigate syncronously once authenticated
      navigate('/');
    }
  }, [auth]);

  useLayoutEffect(() => {
    const authauthenticated = auth;
    if (authauthenticated) {
      // the async on submit screws with the render cycle of useNavigate
      // so we we navigate syncronously once authenticated
      navigate('/');
    }
  }, []);

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

  const onSubmit = async (values: LoginRequest) => {
    try {
      if (auth.authenticated) {
        navigate('/');
        return;
      }

      //remove tokens from storage, having auth bearer token in header is causing issues on the backend server
      removeAuthTokenFromStorage();

      const data = await login(values).unwrap();
      const uid = data.user._id;

      await getUser(uid);
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <CenterCard>
      <Typography variant="h2" textAlign={'center'} mb={4}>
        Mobile Management System
      </Typography>

      <Formik
        initialValues={LoginDefaultValues}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
          <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="on">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    ref={inputRef}
                    name="email"
                    autoComplete="email"
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
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    autoComplete='"password'
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
                    label={<Typography variant="h6">Keep me signed in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="/forgot-password" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  loading={isLoading}
                  disabled={isSubmitting || !isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  onMouseEnter={() => {
                    // test to see if this gets values from autofill to take effect
                    const autoFillElem = document.querySelector(
                      '*:-internal-autofill-selected, *:-internal-autofill-previewed, *:-webkit-autofill'
                    );

                    if (autoFillElem) {
                      inputRef.current.focus();
                      inputRef.current.blur();
                    }
                  }}
                >
                  Login
                </LoadingButton>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </CenterCard>
  );
};
export default LoginForm;
