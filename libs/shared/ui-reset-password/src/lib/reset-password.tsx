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

import { ResetPasswordRequest } from '@lths/shared/data-access';
import { useResetPasswordMutation, useLazyGetUserQuery } from '@lths/shared/data-access';

import CenterCard from './center-card';

const ResetPasswordForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const onShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  type ResetPasswordFormRequest = ResetPasswordRequest & {confirm_password: string}

  const ResetPasswordDefaultValues: ResetPasswordFormRequest = {
    password_reset_token: '',
    new_password: '',
    confirm_password: '',
  };
  const onMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [getUser] = useLazyGetUserQuery();

  const onSubmit = async (formValues: ResetPasswordFormRequest) => {
    try {
      if (formValues.confirm_password !== formValues.new_password) {
        console.log("password doesnt match");
        return;
      }
      const values: ResetPasswordRequest = {
        password_reset_token: formValues.password_reset_token,
        new_password: formValues.new_password,
      }
      const data = await resetPassword(values).unwrap();
      console.log(data);
      navigate('/login');
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
        initialValues={ResetPasswordDefaultValues}
        //validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-confirm-reset-password">New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.new_password && errors.new_password)}
                    id="-password-reset-password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.new_password}
                    name="new_password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue('confirm_password', '');
                    }}
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
                  {touched.new_password && errors.new_password && (
                    <FormHelperText error id="standard-weight-helper-text-password-reset-password">
                      {errors.new_password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-confirm-reset-password">Confirm Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.confirm_password && errors.confirm_password)}
                    id="-password-confirm-reset-password"
                    type={'password'}
                    value={values.confirm_password}
                    name="confirm_password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    endAdornment={null}
                    sx={{
                      '& input::-ms-reveal, & input::-ms-clear': {
                        display: 'none', // remove default edge visibility icon
                      },
                    }}
                  />
                  {touched.confirm_password && errors.confirm_password && (
                    <FormHelperText error id="standard-weight-helper-text-password-confirm-reset-password">
                      {errors.confirm_password}
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
