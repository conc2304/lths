import {
  Dialog,
  Box,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  DatePicker,
  DatePickerSlotsComponentsProps,
  DateTimePicker,
  DateTimePickerSlotsComponentsProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { endOfDay, isBefore, startOfDay } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DialogActions, DialogTitle } from '@lths/shared/ui-elements';
import { pxToRem } from '@lths/shared/utils';

import { UNEDITABLE_EVENT_TYPES } from '../../../constants';
import { EventFormValues, EventType, MMSEvent } from '../../../types';
import { FormLabel, StyledDialogContent, fontStyle } from '../utils';

export type EventFormModalProps = {
  open: boolean;
  eventTypes: EventType[];
  // Dialog Title Props
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  // DialogActions Props
  cancelText: string;
  onCancel: () => void;
  confirmText: string;
  onSave: (values: EventFormValues, id: string | number | null) => void;
  // Calendar Props
  eventValues?: MMSEvent;
};

export const EventFormModal = (props: EventFormModalProps) => {
  const { open, title, subtitle, cancelText, confirmText, onSave, onCancel, eventValues = null, eventTypes } = props;

  const eventTypeUnknown = { id: 'N/A', label: 'Unknown' };
  const eventTypeFallback = { id: 'none', label: 'Select Event Type' };
  const initialValues: Omit<EventFormValues, 'eventType'> & { eventType: EventType | typeof eventTypeFallback } = {
    eventName: eventValues?.title ? eventValues.title.toString() : '',
    isAllDay: eventValues?.allDay || false,
    startDateTime: eventValues?.start ? new Date(eventValues.start) : null,
    endDateTime: eventValues?.end ? new Date(eventValues.end) : null,
    eventType: eventValues?.eventType || eventTypeFallback,
    description: eventValues?.desc?.toString() || '',
    id: eventValues?.id,
    eventId: eventValues?.eventId,
  };

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().min(8, 'Name is too short').required('Required'),
    eventType: Yup.object()
      .shape({
        id: Yup.string().test('valid-eventType', 'Required', (value) => {
          return !!value && value !== 'none';
        }),
        label: Yup.string(),
      })
      .required('Required'),
    startDateTime: Yup.date().nullable().required('Required'),
    endDateTime: Yup.date()
      .nullable()
      .test('valid-endDate', 'The end date must be later than the start date', function (value) {
        if (!value || !this.parent['startDateTime']) return true;
        return !isBefore(value, this.parent['startDateTime']);
      })
      .required('Required'),
    description: Yup.string(),
    isAllDay: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (values.isAllDay) {
        values.startDateTime = values.startDateTime ? startOfDay(new Date(values.startDateTime)) : values.startDateTime;
        values.endDateTime = values.endDateTime ? endOfDay(new Date(values.endDateTime)) : values.endDateTime;
      }
      onSave(values as EventFormValues, eventValues?.id || null);
      setSubmitting(false);
      onCancel();
      resetForm();
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    onReset: () => {
      onCancel();
    },
  });
  const dateTimeSlotProps: DateTimePickerSlotsComponentsProps<Date> & DatePickerSlotsComponentsProps<Date> = {
    inputAdornment: {
      position: 'start',
    },
    textField: {
      required: false,
      variant: 'outlined',
      size: 'small',
      sx: {
        '&.MuiTextField-root': {
          marginRight: 'unset',
          marginTop: 'unset',
          // mb: 2,
        },
        '& .MuiInputBase-inputSizeSmall': {
          ...fontStyle,
        },
      },
    },
  };

  const originalEventTypeUnknown =
    eventValues?.eventType?.id === eventTypeUnknown.id || eventValues?.eventType?.label === eventTypeUnknown.label;
  const availableEventTypes = eventTypes.filter(
    ({ id }) => !UNEDITABLE_EVENT_TYPES.map((e) => e.toString()).includes(id.toString())
  );

  return (
    <Dialog open={open} aria-labelledby="edit-event-dialog-title" className="EventForm--Dailog" maxWidth="md">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box component="form" onSubmit={formik.handleSubmit} style={{ width: '25rem', paddingRight: '0.5rem' }}>
          <DialogTitle title={title} subtitle={subtitle} onClose={() => formik.handleReset(formik.initialValues)} />
          <StyledDialogContent>
            <FormGroup>
              <FormLabel>Event</FormLabel>
              <TextField
                variant="outlined"
                id="edit-event--event-name"
                data-testid="Edit-Event--event-name"
                name="eventName"
                fullWidth
                margin="dense"
                size="small"
                placeholder="Name"
                color={formik.touched.eventName && Boolean(formik.errors.eventName) ? 'error' : 'primary'}
                value={formik.values.eventName}
                onChange={formik.handleChange}
                onBlur={() => {
                  formik.setFieldTouched('eventName', true);
                  formik.validateField('eventName');
                }}
                error={formik.touched.eventName && Boolean(formik.errors.eventName)}
                helperText={formik.touched.eventName && formik.errors.eventName}
                sx={{
                  mb: 2,
                  '&.MuiTextField-root': {
                    marginTop: 'unset',
                  },
                  '& .MuiInputBase-inputSizeSmall': {
                    ...fontStyle,
                  },
                }}
              />
              {/* parsing and stringifying in order to keep id label structure */}
              <Select
                name="eventType"
                id="edit-event--event-type"
                data-testid="Edit-Event--event-type"
                value={JSON.stringify({ id: formik.values.eventType.id, label: formik.values.eventType.label })}
                required
                renderValue={(selected) => {
                  const sVal = JSON.parse(selected) as EventType;
                  if (sVal.id === eventTypeFallback.id) {
                    return (
                      <Box component="span" sx={{ color: (theme) => theme.palette.grey[500] }}>
                        {eventTypeFallback.label}
                      </Box>
                    );
                  }
                  if (sVal.id === eventTypeUnknown.id) {
                    return <Box component="span">{eventTypeUnknown.label}</Box>;
                  }
                  return sVal.label;
                }}
                placeholder="Type"
                onChange={async ({ target: value }) => {
                  formik.setFieldValue('eventType', JSON.parse(value.value as string));
                  await formik.validateField('eventType');
                }}
                onBlur={() => formik.setFieldTouched('eventType', true)}
                error={formik.touched.eventType && Boolean(formik.errors.eventType)}
                size="small"
                sx={{
                  ...fontStyle,
                  mb: 2,
                  lineHeight: '1.2rem',
                }}
              >
                <MenuItem disabled value={JSON.stringify({ id: eventTypeFallback.id, label: eventTypeFallback.label })}>
                  <em>{!availableEventTypes?.length ? 'Sorry, No available event types.' : 'Type'}</em>
                </MenuItem>
                {originalEventTypeUnknown && (
                  <MenuItem
                    sx={{ display: 'none' }}
                    value={JSON.stringify({ id: eventTypeUnknown.id, label: eventTypeUnknown.label })}
                  >
                    <em>{eventTypeUnknown.label}</em>
                  </MenuItem>
                )}
                {availableEventTypes.map(({ label, id }) => (
                  <MenuItem key={id} value={JSON.stringify({ id, label })}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formik.errors?.eventType?.id) && (
                <FormHelperText error sx={{ ml: 2 }}>
                  {formik.errors.eventType?.id}
                </FormHelperText>
              )}
              <OutlinedInput
                id="edit-event--description"
                color="primary"
                name="description"
                placeholder="Description (optional)"
                multiline
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                sx={{ ...fontStyle }}
              />
            </FormGroup>

            <FormGroup sx={{ marginTop: pxToRem(16) }}>
              <FormLabel>Schedule</FormLabel>

              <Box display="flex" justifyContent="space-between">
                {/* IS ALL DAY */}
                {formik.values.isAllDay && (
                  <DatePicker
                    value={formik.values.startDateTime ? startOfDay(formik.values.startDateTime) : null}
                    onChange={async (value) => {
                      if (value) formik.setFieldValue('startDateTime', startOfDay(value));
                      await formik.setFieldTouched('startDateTime', true);
                      await formik.validateField('startDateTime');
                      await formik.validateField('endDateTime');
                    }}
                    slots={{
                      openPickerIcon: CalendarTodayIcon,
                    }}
                    slotProps={{
                      textField: {
                        ...dateTimeSlotProps.textField,
                        placeholder: 'Start date',
                        onBlur: () => {
                          formik.setFieldTouched('startDateTime', true);
                          formik.validateField('startDateTime');
                          formik.validateField('endDateTime');
                        },
                        error: formik.touched.startDateTime && Boolean(formik.errors.startDateTime),
                        helperText: !formik.touched.startDateTime ? undefined : (formik.errors.startDateTime as string),
                      },
                      inputAdornment: dateTimeSlotProps.inputAdornment,
                    }}
                  />
                )}
                {!formik.values.isAllDay && (
                  <DateTimePicker
                    value={formik.values.startDateTime}
                    onChange={async (value) => {
                      if (value) formik.setFieldValue('startDateTime', value);
                      await formik.validateField('startDateTime');
                      await formik.validateField('endDateTime');
                    }}
                    slots={{
                      openPickerIcon: CalendarTodayIcon,
                    }}
                    slotProps={{
                      textField: {
                        ...dateTimeSlotProps.textField,
                        placeholder: 'Start date & time',
                        onBlur: () => {
                          formik.setFieldTouched('startDateTime', true);
                          formik.validateField('startDateTime');
                          formik.validateField('endDateTime');
                        },
                        error: formik.touched.startDateTime && Boolean(formik.errors.startDateTime),
                        helperText: !formik.touched.startDateTime ? undefined : (formik.errors.startDateTime as string),
                      },
                      inputAdornment: dateTimeSlotProps.inputAdornment,
                    }}
                  />
                )}
              </Box>
              {/* END DATE FORM */}

              <Box display="flex" justifyContent="space-between">
                {/* IS ALL DAY */}
                {formik.values.isAllDay && (
                  <DatePicker
                    value={formik.values.endDateTime ? endOfDay(formik.values.endDateTime) : null}
                    onChange={(value) => {
                      if (value) formik.setFieldValue('endDateTime', endOfDay(value));
                      formik.setFieldTouched('endDateTime', true);
                      formik.validateField('startDateTime');
                      formik.validateField('endDateTime');
                    }}
                    slots={{
                      openPickerIcon: CalendarTodayIcon,
                    }}
                    slotProps={{
                      textField: {
                        ...dateTimeSlotProps.textField,
                        placeholder: 'End date',
                        onBlur: () => {
                          formik.setFieldTouched('endDateTime', true);
                          formik.validateField('startDateTime');
                          formik.validateField('endDateTime');
                        },
                        error: formik.touched.endDateTime && Boolean(formik.errors.endDateTime),
                        helperText: !formik.touched.endDateTime ? undefined : (formik.errors.endDateTime as string),
                      },
                      inputAdornment: dateTimeSlotProps.inputAdornment,
                      openPickerIcon: dateTimeSlotProps.openPickerIcon,
                    }}
                    sx={{ '& .MuiFormControl-root': { marginTop: 'unset' } }}
                    minDate={formik.values.startDateTime !== null ? formik.values.startDateTime : undefined}
                  />
                )}
                {!formik.values.isAllDay && (
                  <DateTimePicker
                    value={formik.values.endDateTime}
                    onChange={(value) => {
                      formik.setFieldTouched('endDateTime', true);
                      formik.setFieldValue('endDateTime', value);
                      formik.validateField('startDateTime');
                      formik.validateField('endDateTime');
                    }}
                    slots={{
                      openPickerIcon: CalendarTodayIcon,
                    }}
                    slotProps={{
                      textField: {
                        ...dateTimeSlotProps.textField,
                        placeholder: 'End date & time',
                        onBlur: () => {
                          formik.setFieldTouched('endDateTime', true);
                          formik.validateField('endDateTime');
                          formik.validateField('startDateTime');
                        },
                        error: formik.touched.endDateTime && Boolean(formik.errors.endDateTime),
                        helperText: !formik.touched.endDateTime ? undefined : (formik.errors.endDateTime as string),
                      },
                      inputAdornment: dateTimeSlotProps.inputAdornment,
                      openPickerIcon: dateTimeSlotProps.openPickerIcon,
                    }}
                    sx={{ '& .MuiFormControl-root': { marginTop: 'unset' } }}
                    minDateTime={formik.values.startDateTime !== null ? formik.values.startDateTime : undefined}
                  />
                )}
              </Box>
              {/*  THE TOHER STUFF HERE */}
              <FormControlLabel
                control={
                  <Checkbox
                    data-testid="Edit-Event--isAllDay"
                    name="isAllDay"
                    value={formik.values.isAllDay}
                    onChange={formik.handleChange}
                    checked={formik.values.isAllDay}
                  />
                }
                label="All-day event"
                sx={{ '& .MuiFormControlLabel-label': { ...fontStyle }, width: 'fit-content', ml: 0.25 }}
              />
            </FormGroup>
          </StyledDialogContent>
          <DialogActions
            data-testid="Edit-Event--actions-wrapper"
            cancelText={cancelText}
            confirmText={confirmText}
            onCancel={() => formik.handleReset(formik.values)}
            isSubmitting={formik.isSubmitting}
            disabled={!formik.isValid || !formik.dirty}
          />
        </Box>
      </LocalizationProvider>
    </Dialog>
  );
};
