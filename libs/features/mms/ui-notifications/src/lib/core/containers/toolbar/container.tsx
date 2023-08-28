import { useEffect } from 'react';
import { Box, Fab, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ToolbarProps } from './types';
import { GroupLabel, OutlinedTextField } from '../../elements';
import { Content } from '../types';

const validationSchema = yup.object({
  headline: yup.string().required('Headline is required'),
  body: yup.string().required('Body is required'),
  notification_link: yup.string().required('Notification link is required'),
  page_id: yup.string().when('notification_link', {
    is: 'inside',
    then: (schema) => schema.required('Page id is required'),
  }),
  page_link: yup.string().when('notification_link', {
    is: 'outside',
    then: (schema) => schema.required('Page link is required'),
  }),
});

type ToolbarContainerProps = {
  onToolbarChange: (content: Content) => void;
};

const Container = ({ onToolbarChange }: ToolbarContainerProps) => {
  const onSubmit = async (values: ToolbarProps) => {
    console.log('submitting...', values);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting } = useFormik({
    initialValues: {
      headline: '',
      body: '',
      notification_link: 'inside',
      page_id: '',
      page_link: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const { body, headline } = values;

  const isNotValid = Object.keys(errors).length > 0;

  useEffect(() => {
    onToolbarChange({ body, headline });
  }, [body, headline]);

  return (
    <Box sx={{ paddingY: 3, paddingX: 4, height: '100%', position: 'relative' }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          paddingY: 2,
          paddingX: 3,
          borderRadius: 1,
        }}
      >
        <GroupLabel>TEXT</GroupLabel>
        <OutlinedTextField
          label="Headline"
          id="headline"
          sx={{ marginTop: 3 }}
          name="headline"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.headline}
          error={touched.headline && Boolean(errors.headline)}
          helperText={touched.headline && errors.headline}
        />
        <OutlinedTextField
          label="Body"
          multiline
          rows={5}
          sx={{ marginTop: 2 }}
          name="body"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.body}
          error={touched.body && Boolean(errors.body)}
          helperText={touched.body && errors.body}
        />
        <GroupLabel marginTop={3} marginBottom={2}>
          NOTIFICATION LINK
        </GroupLabel>
        <RadioGroup
          name="notification_link"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.notification_link}
        >
          <FormControlLabel value="inside" control={<Radio />} label="Link inside app" />
          <FormControlLabel value="outside" control={<Radio />} label="Link outside app" />
        </RadioGroup>
        {values.notification_link === 'inside' && (
          <Select
            fullWidth
            sx={{ marginTop: 3 }}
            name="page_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.page_id}
            error={touched.page_id && Boolean(errors.page_id)}
          >
            <MenuItem value="ducks">Ducks</MenuItem>
            <MenuItem value="home">Home</MenuItem>
          </Select>
        )}
        {values.notification_link === 'outside' && (
          <OutlinedTextField
            sx={{ marginTop: 2 }}
            label="Page link"
            name="page_link"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.page_link}
            error={touched.page_link && Boolean(errors.page_link)}
            helperText={touched.page_link && errors.page_link}
          />
        )}
      </Box>
      <Fab
        sx={{ position: 'absolute', bottom: 24, left: -72 }}
        disabled={isNotValid || isSubmitting}
        onClick={() => handleSubmit()}
      >
        <Typography fontWeight={500}>SAVE</Typography>
      </Fab>
    </Box>
  );
};

export default Container;
