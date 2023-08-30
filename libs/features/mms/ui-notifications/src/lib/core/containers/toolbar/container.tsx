import { HTMLAttributes } from 'react';
import {
  Autocomplete,
  Box,
  CircularProgress,
  Fab,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { EnumValue, NotificationProps, UpdateNotificationRequestProps } from '@lths/features/mms/data-access';

import { getInitialValues } from './utils';
import { GroupLabel, OutlinedTextField } from '../../elements';
import { usePageList } from '../../hooks';
import { UpdateEditorStateProps } from '../types';

const validationSchema = yup.object({
  headline: yup.string().required('Headline is required'),
  content: yup.string().required('Body is required'),
  notification_link: yup.string().required('Notification link is required'),
  inside_app: yup.string().when('notification_link', {
    is: 'inside',
    then: (schema) => schema.required('Page id is required'),
  }),
  outside_app: yup.string().when('notification_link', {
    is: 'outside',
    then: (schema) => schema.required('Page link is required'),
  }),
});

type ToolbarContainerProps = {
  onUpdateNotification: (data: UpdateNotificationRequestProps) => void;
  notificationData: NotificationProps;
  updateEditorState: UpdateEditorStateProps;
  isUpdating: boolean;
};

const Container = ({
  notificationData,
  onUpdateNotification,
  updateEditorState,
  isUpdating,
}: ToolbarContainerProps) => {
  const { pageList } = usePageList();

  const onSubmit = async () => {
    onUpdateNotification(notificationData);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, setFieldValue } = useFormik({
    initialValues: getInitialValues(notificationData),
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const isNotValid = Object.keys(errors).length > 0;

  const handleToolbarChange = (e: any) => {
    const { name, value } = e.target;
    console.log('change e', name, value);
    const isNotificationKey = ['inside_app', 'outside_app'].includes(name);
    if (name !== 'notification_link') updateEditorState(name, value, isNotificationKey ? 'notification' : null);
    handleChange(e);
  };

  const getOptionLabel = (option: EnumValue) => (option ? option.name : '');

  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: EnumValue) => {
    return (
      <Box component="li" {...props}>
        <Typography>{option.name}</Typography>
      </Box>
    );
  };

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
          onChange={handleToolbarChange}
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
          name="content"
          onChange={handleToolbarChange}
          onBlur={handleBlur}
          value={values.content}
          error={touched.content && Boolean(errors.content)}
          helperText={touched.content && errors.content}
        />
        <GroupLabel marginTop={3} marginBottom={2}>
          NOTIFICATION LINK
        </GroupLabel>
        <RadioGroup
          name="notification_link"
          onChange={handleToolbarChange}
          onBlur={handleBlur}
          value={values.notification_link}
        >
          <FormControlLabel value="inside" control={<Radio />} label="Link inside app" />
          <FormControlLabel value="outside" control={<Radio />} label="Link outside app" />
        </RadioGroup>
        {values.notification_link === 'inside' && (
          <Autocomplete
            sx={{ marginTop: 2 }}
            id="inside_app"
            options={pageList}
            value={pageList.find((p) => p.value === values.inside_app) || null}
            onChange={(e, item) => {
              setFieldValue('inside_app', item?.value);
              updateEditorState('inside_app', item?.value || '', 'notification');
            }}
            renderOption={renderOption}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => (
              <TextField
                {...params}
                error={touched.inside_app && Boolean(errors.inside_app)}
                helperText={touched.inside_app && errors.inside_app}
              />
            )}
            blurOnSelect
          />
        )}
        {values.notification_link === 'outside' && (
          <OutlinedTextField
            sx={{ marginTop: 2 }}
            label="Page link"
            name="outside_app"
            onChange={handleToolbarChange}
            onBlur={handleBlur}
            value={values.outside_app}
            error={touched.outside_app && Boolean(errors.outside_app)}
            helperText={touched.outside_app && errors.outside_app}
          />
        )}
      </Box>
      <Fab
        sx={{ position: 'absolute', bottom: 24, left: -72 }}
        disabled={isNotValid || isSubmitting || isUpdating}
        onClick={() => handleSubmit()}
      >
        {isUpdating ? <CircularProgress size={20} /> : <Typography fontWeight={500}>SAVE</Typography>}
      </Fab>
    </Box>
  );
};

export default Container;
