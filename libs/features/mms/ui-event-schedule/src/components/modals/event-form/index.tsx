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
  DialogContent,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { endOfDay, isBefore, startOfDay } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DatePickerLTHS, DialogActions, DialogTitle } from '@lths/shared/ui-elements';
import { pxToRem } from '@lths/shared/utils';

import { UNEDITABLE_EVENT_TYPES } from '../../../constants';
import { EventFormValues, EventType, MMSEvent } from '../../../types';
// import { FormLabel, fontStyle } from '../utils';

// TODO - update the time section when the full design is finalized

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
  const eventTypeFallback = { id: 'none', label: 'Type' };
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

  const originalEventTypeUnknown =
    eventValues?.eventType?.id === eventTypeUnknown.id || eventValues?.eventType?.label === eventTypeUnknown.label;
  const availableEventTypes = eventTypes.filter(
    ({ id }) => !UNEDITABLE_EVENT_TYPES.map((e) => e.toString()).includes(id.toString())
  );

  return (
    <Dialog open={open} aria-labelledby="edit-event-dialog-title" className="EventForm--Dailog" onClose={onCancel}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DialogTitle title={title} subtitle={subtitle} onClose={() => formik.handleReset(formik.initialValues)} />
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Typography variant="overline">Event</Typography>
              <TextField
                variant="outlined"
                data-testid="Edit-Event--event-name"
                name="eventName"
                fullWidth
                margin="dense"
                size="small"
                label="Name"
                placeholder="Name"
                color={formik.touched.eventName && Boolean(formik.errors.eventName) ? 'error' : 'secondary'}
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
                    // ...fontStyle,
                  },
                }}
              />
              {/* parsing and stringifying in order to keep id label structure */}
              <FormControl fullWidth>
                <InputLabel
                  id="Edit-Event--event-type"
                  color={formik.touched.eventType && Boolean(formik.errors.eventType) ? 'error' : 'secondary'}
                >
                  Type
                </InputLabel>
                <Select
                  name="eventType"
                  data-testid="Edit-Event--event-type"
                  id="Edit-Event--event-type"
                  value={JSON.stringify({ id: formik.values.eventType.id, label: formik.values.eventType.label })}
                  required
                  label="Type"
                  // placeholder="Type"
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
                  onChange={async ({ target: value }) => {
                    formik.setFieldValue('eventType', JSON.parse(value.value as string));
                    await formik.validateField('eventType');
                  }}
                  onBlur={() => formik.setFieldTouched('eventType', true)}
                  error={formik.touched.eventType && Boolean(formik.errors.eventType)}
                  size="small"
                  sx={{
                    // ...fontStyle,
                    mb: 2,
                  }}
                >
                  <MenuItem
                    disabled
                    value={JSON.stringify({ id: eventTypeFallback.id, label: eventTypeFallback.label })}
                  >
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
              </FormControl>

              <OutlinedInput
                color="primary"
                name="description"
                placeholder="Description (optional)"
                multiline
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                // sx={{ ...fontStyle }}
              />
            </FormGroup>

            <FormGroup sx={{ marginTop: pxToRem(16) }}>
              <Typography variant="overline">Schedule</Typography>
              <Box mb={2}>
                <DatePickerLTHS
                  mode={formik.values.isAllDay ? 'date' : 'datetime'}
                  value={formik.values.startDateTime}
                  placeholder="Start date"
                  onChange={async (value) => {
                    if (value) formik.setFieldValue('startDateTime', startOfDay(value));
                    await formik.setFieldTouched('startDateTime', true);
                    await formik.validateField('startDateTime');
                    await formik.validateField('endDateTime');
                  }}
                  onBlur={() => {
                    formik.setFieldTouched('startDateTime', true);
                    formik.validateField('startDateTime');
                    formik.validateField('endDateTime');
                  }}
                  error={formik.touched.startDateTime && Boolean(formik.errors.startDateTime)}
                  helperText={!formik.touched.startDateTime ? undefined : (formik.errors.startDateTime as string)}
                />
                <DatePickerLTHS
                  mode={formik.values.isAllDay ? 'date' : 'datetime'}
                  value={formik.values.endDateTime}
                  placeholder="End date"
                  onChange={async (value) => {
                    if (value) formik.setFieldValue('startDateTime', startOfDay(value));
                    await formik.setFieldTouched('startDateTime', true);
                    await formik.validateField('startDateTime');
                    await formik.validateField('endDateTime');
                  }}
                  onBlur={() => {
                    formik.setFieldTouched('startDateTime', true);
                    formik.validateField('startDateTime');
                    formik.validateField('endDateTime');
                  }}
                  error={formik.touched.endDateTime && Boolean(formik.errors.endDateTime)}
                  helperText={!formik.touched.endDateTime ? undefined : (formik.errors.endDateTime as string)}
                />
              </Box>
              {/* END DATE FORM */}

              <Box display="flex" justifyContent="space-between"></Box>
              {/*  THE OTHER STUFF HERE */}
              {/*  THE OTHER STUFF HERE */}
              {/*  THE OTHER STUFF HERE */}
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
                sx={{
                  '& .MuiFormControlLabel-label': {
                    // ...fontStyle
                  },
                  width: 'fit-content',
                  ml: 0.6,
                }}
              />
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions
          data-testid="Edit-Event--actions-wrapper"
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={() => formik.handleReset(formik.values)}
          isSubmitting={formik.isSubmitting}
          disabled={!formik.isValid || !formik.dirty}
        />
      </LocalizationProvider>
    </Dialog>
  );
};
