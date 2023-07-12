import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useUpdatePageSettingsMutation } from '@lths/features/mms/data-access';

import Title from './Title';
import { useEditorActions } from '../../../context';

const labelStyles = {
  color: 'black',
  fontWeight: 500,
  fontSize: '0.825rem',
};

const Settings = () => {
  const {
    settings: { page_id, name, description, status, default_page },
  } = useEditorActions();

  const isPublished = status === 'published';

  const [updatePageSettings, { isLoading }] = useUpdatePageSettingsMutation();

  const onSubmit = async (values) => {
    const requestData = {
      ...values,
      page_id,
    };
    try {
      await updatePageSettings(requestData);
    } catch (error) {
      console.error('Error in updating page settings');
    }
  };

  const initialValues: { name?: string; description?: string } = {
    description,
  };

  let validationSchema = yup.object({
    description: yup.string(),
  });

  if (!isPublished) {
    initialValues.name = name;
    validationSchema = validationSchema.concat(
      yup.object({
        name: yup.string().required(),
      })
    );
  }

  const { values, handleChange, handleSubmit, errors, isSubmitting, touched, handleReset } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <Box style={{ backgroundColor: '#F3F3F3', padding: 16 }}>
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" alignItems="stretch" marginY={3} sx={{ minHeight: '250px', gap: 15 }}>
          <Grid item xs={3}>
            <Title
              title="Page details"
              description="Explain how this setting works and what the user can specify."
              infoText="Explain how this setting works and what the user can specify."
            />
            <Stack marginTop={4}>
              <InputLabel sx={labelStyles}>PAGE NAME</InputLabel>
              {isPublished ? (
                <Typography sx={{ marginTop: 2, height: '1.75rem' }}>{name}</Typography>
              ) : (
                <>
                  <OutlinedInput
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    sx={{ background: 'white', marginTop: 2 }}
                    error={touched.name && Boolean(errors.name)}
                  />
                  {errors.name && <FormHelperText error>page name is required</FormHelperText>}
                </>
              )}
            </Stack>
            <Stack marginTop={5}>
              <InputLabel sx={labelStyles}>DESCRIPTION (optional)</InputLabel>
              <OutlinedInput
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                multiline={true}
                rows={4}
                sx={{ background: 'white', marginTop: 2 }}
                error={touched.description && Boolean(errors.description)}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Title
              title="System"
              description="Explain how this setting works and what the user can specify."
              infoText="Explain how this setting works and what the user can specify."
            />
            <Stack marginTop={4}>
              <InputLabel sx={labelStyles}>DEFAULT PAGE</InputLabel>
              <Typography sx={{ marginTop: 2, height: '1.75rem' }}>{default_page || 'N/A'}</Typography>
            </Stack>
            <Stack marginTop={isPublished ? 5 : 8}>
              <InputLabel sx={labelStyles}>PAGE ID</InputLabel>
              <Typography sx={{ marginTop: 2 }}>/{page_id}</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ borderBottomWidth: 2, marginY: 6 }} />
        <Stack direction="row" justifyContent={'flex-end'} paddingX={2}>
          <Button variant="outlined" sx={{ marginRight: 2 }} onClick={handleReset}>
            CANCEL
          </Button>
          <LoadingButton loading={isLoading} disabled={isSubmitting} variant="contained" onClick={() => handleSubmit()}>
            SAVE
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default Settings;
