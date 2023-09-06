import { HTMLAttributes, useEffect } from 'react';
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

import { EnumValue, NotificationDataProps } from '@lths/features/mms/data-access';

import { GroupLabel, OutlinedTextField } from '../../elements';
import { usePageList } from '../../hooks';
import { UpdateEditorStateProps } from '../types';

const validationSchema = yup.object({
  headline: yup.string().required('Headline is required'),
  content: yup.string().required('Body is required'),
  target_type: yup.string().required('Notification link is required'),
  page_id: yup.string().when('target_type', {
    is: 'native',
    then: (schema) => schema.required('Page is required'),
  }),
  url: yup.string().when('target_type', {
    is: 'web',
    then: (schema) => schema.required('Page link is required'),
  }),
});

type ToolbarContainerProps = {
  onUpdateNotification: (data: NotificationDataProps) => void;
  notificationData: NotificationDataProps;
  updateEditorState: UpdateEditorStateProps;
  isUpdating: boolean;
};

const Container = ({
  notificationData,
  onUpdateNotification,
  updateEditorState,
  isUpdating,
}: ToolbarContainerProps) => {
  const {
    headline = '',
    content = '',
    target: { type = 'native', page_id = '', url = '' } = {},
  } = notificationData || {};

  const { pageList } = usePageList();

  const onSubmit = async () => {
    onUpdateNotification(notificationData);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, setFieldValue, validateForm } =
    useFormik({
      initialValues: {
        headline,
        content,
        target_type: type,
        page_id,
        url,
      },
      validationSchema: validationSchema,
      onSubmit: onSubmit,
      enableReinitialize: true,
    });

  const isNotValid = Object.keys(errors).length > 0;

  const handleToolbarChange = (e: any) => {
    const { name, value } = e.target;
    updateEditorState(name, value);
    handleChange(e);
  };

  const getPageOptionLabel = (option: EnumValue) => (option ? option.name : '');

  const renderPageOption = (props: HTMLAttributes<HTMLLIElement>, option: EnumValue) => {
    return (
      <Box component="li" {...props}>
        <Typography>{option.name}</Typography>
      </Box>
    );
  };

  const selectedPage = pageList.find((p) => p.value === values.page_id) || null;

  const handleTargetPropChange = (key: string, value: string) => {
    setFieldValue(key, value);
    updateEditorState(key, value, 'target');
  };

  useEffect(() => {
    validateForm();
  }, [values.target_type]);

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
          name="target_type"
          onChange={(e) => handleTargetPropChange('type', e.target.value)}
          onBlur={handleBlur}
          value={values.target_type}
        >
          <FormControlLabel value="native" control={<Radio />} label="Link inside app" />
          <FormControlLabel value="web" control={<Radio />} label="Link outside app" />
        </RadioGroup>
        {values.target_type === 'native' && (
          <Autocomplete
            sx={{ marginTop: 2 }}
            id="page_id"
            options={pageList}
            value={selectedPage}
            onChange={(e, item) => handleTargetPropChange('page_id', item?.value || '')}
            renderOption={renderPageOption}
            getOptionLabel={getPageOptionLabel}
            renderInput={(params) => (
              <TextField
                name="page_id"
                {...params}
                label="Page"
                onBlur={handleBlur}
                error={(touched.target_type || touched.page_id) && Boolean(errors.page_id)}
                helperText={touched.page_id && errors.page_id}
              />
            )}
          />
        )}
        {values.target_type === 'web' && (
          <OutlinedTextField
            sx={{ marginTop: 2 }}
            label="Page link"
            name="url"
            onChange={(e) => handleTargetPropChange('url', e.target.value)}
            onBlur={handleBlur}
            value={values.url}
            error={(touched.target_type || touched.url) && Boolean(errors.url)}
            helperText={touched.url && errors.url}
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
