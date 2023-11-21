import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DateField } from '@mui/x-date-pickers';
import { format, subYears } from 'date-fns';
import { useFormik } from 'formik';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import * as Yup from 'yup';

import { selectUserId, selectUserProfileData, useAppSelector } from '@lths/features/mms/data-access';
import { UserProfileData, useUpdateUserMutation } from '@lths/shared/data-access';
import { CountrySelect, toastQueueService } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';
import { getCountryData, validatePostalCode } from '@lths/shared/utils';

const EditProfilePage = () => {
  const { email, first_name, last_name, username, phone_number, date_of_birth, city, country, zip_code } =
    useAppSelector(selectUserProfileData);
  const userId = useAppSelector(selectUserId);
  const [updateUser] = useUpdateUserMutation();

  const foundCode = getCountryData({ country })?.code || undefined;
  const [countryCode, setCountryCode] = useState(foundCode);

  const initialValues = {
    email: email || '',
    first_name: first_name || '',
    last_name: last_name || '',
    username: username || '',
    phone_number: phone_number || '',
    date_of_birth: date_of_birth
      ? format(new Date(date_of_birth).setDate(new Date(date_of_birth).getUTCDate()), 'MM/dd/yyyy')
      : '',
    city: city || '',
    country: country || null,
    zip_code: zip_code || '',
  };

  const minDob = subYears(new Date(), 150);
  const maxDob = new Date();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().min(2, 'Too short').required('Required'),
    last_name: Yup.string().min(2, 'Too short').required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    username: Yup.string().min(6, 'Username is too short'),
    phone_number: Yup.string().test('valid-phone-number', 'Phone number is not valid', (value: string) => {
      return value === '' || value === undefined || matchIsValidTel(value);
    }),
    date_of_birth: Yup.date().min(minDob, "You're not that old!").max(maxDob, 'Are you from the future?!?'),
    city: Yup.string(),
    country: Yup.string().nullable(),
    zip_code: Yup.string().test(
      'valid-postal-code',
      () => `Invalid ${countryCode} Zip Code`,
      (value) => {
        return validatePostalCode(countryCode, value);
      }
    ),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    dirty,
    touched,
    errors,
    isSubmitting,
    isValid,
    setFieldValue,
    setFieldTouched,
    validateField,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (values, { setSubmitting }) => {
      handleUpdateUser(values);
      setSubmitting(false);
    },
  });

  const handleUpdateUser = async (values: UserProfileData) => {
    const cleanedValues: Partial<UserProfileData> = {};

    Object.keys(values).forEach((key) => {
      cleanedValues[key] = values[key] || '';
    });

    const formattedValues = {
      ...cleanedValues,
      date_of_birth: cleanedValues.date_of_birth
        ? format(new Date(cleanedValues.date_of_birth), 'yyyy-MM-dd')
        : undefined,
      phone_number: cleanedValues.phone_number ? cleanedValues.phone_number.toString().split(' ').join('') : undefined,
      zip_code: cleanedValues.zip_code ? cleanedValues.zip_code.toString().trim() : undefined,
    };

    const response = await updateUser({ userId, ...formattedValues }).unwrap();

    if (response.success) {
      toastQueueService.addToastToQueue('Profile successfully updated', { type: 'success' });
      resetForm({ values });
    } else {
      // response error should be caught by the middleware
    }
  };

  return (
    <Box>
      <PageHeader title="Edit User Profile" sx={{ mt: '1rem', mb: '3.5rem' }} />
      <Card sx={{ maxWidth: '700px', margin: '0 auto', p: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <CardContent>
            <Grid
              container
              justifyContent={'space-between'}
              alignItems={'center'}
              rowSpacing={0}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Avatar
                  alt="User Avatar"
                  sx={{
                    width: 110,
                    height: 110,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                    mr: '3rem',
                  }}
                >
                  <Typography variant="h2">{first_name.charAt(0) + ' ' + last_name.charAt(0)}</Typography>
                </Avatar>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                  rowSpacing={0}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12} sm={6} md={12}>
                    <Typography variant="h5" pb={0.5}>
                      Name
                    </Typography>
                    <TextField
                      aria-label="First Name"
                      name="first_name"
                      size="small"
                      fullWidth
                      placeholder="First name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(touched.first_name && errors.first_name) || ' '}
                      color={touched.first_name && Boolean(errors.first_name) ? 'error' : 'primary'}
                      error={touched.first_name && Boolean(errors.first_name)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12}>
                    <TextField
                      aria-label="Last Name"
                      id="edit-profile--last-name"
                      name="last_name"
                      size="small"
                      fullWidth
                      placeholder="Last name"
                      value={values.last_name}
                      helperText={(touched.last_name && errors.last_name) || ' '}
                      color={touched.last_name && Boolean(errors.last_name) ? 'error' : 'primary'}
                      error={touched.last_name && Boolean(errors.last_name)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" pb={0.5}>
                  Email
                </Typography>
                <TextField
                  name="email"
                  aria-label="Email"
                  placeholder="Email"
                  value={values.email}
                  type="email"
                  onChange={handleChange}
                  helperText={(touched.email && errors.email) || ' '}
                  onBlur={handleBlur}
                  color={touched.email && Boolean(errors.email) ? 'error' : 'primary'}
                  error={touched.email && Boolean(errors.email)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Typography variant="h5" pb={0.5}>
                  Username
                </Typography>
                <TextField
                  name="username"
                  aria-label="Username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={(touched.username && errors.username) || ' '}
                  color={touched.username && Boolean(errors.username) ? 'error' : 'primary'}
                  error={touched.username && Boolean(errors.username)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h5" pb={0.5}>
                  Date of Birth
                </Typography>
                <DateField
                  name="date_of_birth"
                  aria-label="Date of Birth"
                  value={new Date(values.date_of_birth)}
                  onChange={async (value) => {
                    await setFieldValue('date_of_birth', value);
                    await setFieldTouched('date_of_birth', true);
                  }}
                  fullWidth
                  slotProps={{
                    textField: {
                      helperText: (touched.date_of_birth && errors.date_of_birth) || ' ',
                      color: touched.date_of_birth && Boolean(errors.date_of_birth) ? 'error' : 'primary',
                    },
                  }}
                  minDate={minDob}
                  maxDate={maxDob}
                  size="small"
                  color={touched.date_of_birth && Boolean(errors.date_of_birth) ? 'error' : 'primary'}
                />
              </Grid>
            </Grid>

            {/*  */}
            <Divider sx={{ mt: 0, mb: 2 }} />
            {/*  */}
            <Grid
              container
              spacing={0}
              justifyContent={'space-between'}
              alignItems={'flex-start'}
              rowSpacing={0}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h5" pb={0.5}>
                  City
                </Typography>
                <TextField
                  name="city"
                  aria-label="City"
                  placeholder="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={(touched.city && errors.city) || ' '}
                  color={touched.city && Boolean(errors.city) ? 'error' : 'primary'}
                  error={touched.city && Boolean(errors.city)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <Typography variant="h5" pb={0.5}>
                  Country
                </Typography>
                <CountrySelect
                  value={values.country}
                  onChange={async (event, value) => {
                    setCountryCode(value ? value.code : undefined);
                    await setFieldValue('country', value ? value.label : null);
                    await setFieldTouched('country');
                    await validateField('zip_code');
                  }}
                  onBlur={handleBlur}
                  textFieldProps={{
                    size: 'small',
                    fullWidth: true,
                    helperText: (touched.country && errors.country) || ' ',
                    color: touched.country && Boolean(errors.country) ? 'error' : 'primary',
                    error: touched.country && Boolean(errors.country),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h5" pb={0.5}>
                  Zip
                </Typography>
                <TextField
                  name="zip_code"
                  aria-label="Zip Code"
                  placeholder="Zip Code"
                  inputProps={{ maxLength: 10, minLength: 5 }}
                  value={values.zip_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={(touched.zip_code && errors.zip_code) || ' '}
                  color={touched.zip_code && Boolean(errors.zip_code) ? 'error' : 'primary'}
                  error={touched.zip_code && Boolean(errors.zip_code)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h5" pb={0.5} component="label" htmlFor="edit-profile--phone-number">
                  Phone Number
                </Typography>
                <MuiTelInput
                  id="edit-profile--phone-number"
                  defaultCountry="US"
                  name="phone_number"
                  size="small"
                  fullWidth
                  placeholder="Phone Number"
                  value={values.phone_number}
                  onBlur={handleBlur}
                  helperText={(touched.phone_number && errors.phone_number) || ' '}
                  color={touched.phone_number && Boolean(errors.phone_number) ? 'error' : 'primary'}
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  onChange={async (value) => {
                    await setFieldValue('phone_number', value);
                    await setFieldTouched('phone_number');
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button sx={{ mr: 4 }} disabled={!dirty} onClick={() => resetForm()} aria-label="Cancel Editing">
              CANCEL
            </Button>
            <LoadingButton
              aria-label="Update User Profile"
              className={`${isValid ? 'valid' : 'invalid'} ${dirty ? 'dirty' : 'clean'}  `}
              disabled={!isValid || isSubmitting || !dirty}
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
            >
              UPDATE
            </LoadingButton>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default EditProfilePage;
