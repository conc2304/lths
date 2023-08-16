import { Button, Divider, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { object, string } from 'yup';

import { PageDetail } from '@lths/features/mms/data-access';
import { useEditorActions } from '@lths/features/mms/ui-editor';

import { BaseContainer, HeaderContainer } from '../core';
import { PageStatus } from '../core/types';

const labelStyles = {
  color: 'black',
  fontWeight: 500,
  fontSize: '0.825rem',
};

type Props = {
  onUpdate: (data: PageDetail) => void;
};

const Settings = ({ onUpdate }: Props) => {
  const { data } = useEditorActions();
  const page_data = data as PageDetail;
  const { page_id, name, description, status, default_page_name } = page_data;

  const isPublished = status === PageStatus.PUBLISHED;

  const onSubmit = async (values) => {
    onUpdate({ ...values });
  };

  const initialValues: { name?: string; description?: string } = {
    description,
  };

  //TODO: Change this to object based conditional schema validation. Pass status as a parameter in the initialValues and access it with yup
  let validationSchema = object({
    description: string(),
  });

  if (!isPublished) {
    initialValues.name = name;
    validationSchema = validationSchema.concat(
      object({
        name: string().required(),
      })
    );
  }

  const { values, handleChange, handleSubmit, errors, isSubmitting, touched, handleReset } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <BaseContainer>
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" alignItems="stretch" marginY={3} sx={{ minHeight: '250px', gap: 15 }}>
          <Grid item xs={3}>
            <HeaderContainer
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
            <HeaderContainer
              title="System"
              description="Explain how this setting works and what the user can specify."
              infoText="Explain how this setting works and what the user can specify."
            />
            <Stack marginTop={4}>
              <InputLabel sx={labelStyles}>DEFAULT PAGE</InputLabel>
              <Typography sx={{ marginTop: 2, height: '1.75rem' }}>{default_page_name || 'N/A'}</Typography>
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
          <LoadingButton loading={false} disabled={isSubmitting} variant="contained" onClick={() => handleSubmit()}>
            SAVE
          </LoadingButton>
        </Stack>
      </form>
    </BaseContainer>
  );
};

export default Settings;
