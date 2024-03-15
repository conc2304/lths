import {
  Dialog,
  Box,
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
import { addHours, endOfDay, isAfter, isBefore, startOfDay } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DatePickerLTHS, DialogActions, DialogTitle, SelectLTHS } from '@lths/shared/ui-elements';
import { pxToRem } from '@lths/shared/utils';

import { UNEDITABLE_EVENT_TYPES } from '../../../constants';
import { EventFormValues, EventType, MMSEvent } from '../../../types';

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
  // const eventTypeFallback = { id: 'none', label: 'Type' };
  const initialValues: Omit<EventFormValues, 'eventType'> & { eventType: EventType | null } = {
    eventName: eventValues?.title ? eventValues.title.toString() : '',
    isAllDay: eventValues?.allDay || false,
    startDateTime: eventValues?.start ? new Date(eventValues.start) : null,
    endDateTime: eventValues?.end ? new Date(eventValues.end) : null,
    eventType: eventValues?.eventType || null,
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
      .test('valid-endDate', 'Invalid end date', function (value) {
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
        // move datetimes to start/end of day if is allday event
        values.startDateTime = values.startDateTime ? startOfDay(new Date(values.startDateTime)) : values.startDateTime;
        values.endDateTime = values.endDateTime ? endOfDay(new Date(values.endDateTime)) : values.endDateTime;
      }
      onSave(values as EventFormValues, eventValues?.id || null);
      setSubmitting(false);
      onCancel();
      resetForm();
    },
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    onReset: () => {
      onCancel();
    },
  });

  // handle when the backend is screwed up and gives us garbage
  const originalEventTypeUnknown =
    eventValues?.eventType?.id === eventTypeUnknown.id || eventValues?.eventType?.label === eventTypeUnknown.label;
  const availableEventTypes = eventTypes
    .filter(({ id }) => !UNEDITABLE_EVENT_TYPES.map((e) => e.toString()).includes(id.toString()))
    .map((v) => ({ value: v.id, label: v.label }));

  const handleDateTimeChange = async (value: Date | null, field: 'startDateTime' | 'endDateTime') => {
    // datepickers don't play nice with formik change handlers, so we have to manually do it the onchange on blur things that formik.onChange would handle

    const changeField = field;
    const dependentField = field === 'startDateTime' ? 'endDateTime' : 'startDateTime';

    if (value) formik.setFieldValue(changeField, value);

    // if we move our start date past the end date, then move the end date to be an hour after start
    if (
      value && // current value not null
      changeField === 'startDateTime' && // only change when changing 'startdate'
      formik.values.endDateTime && // only change end if 'enddate' is set
      isAfter(value, formik.values.endDateTime) // only update is start is moved to after end
    ) {
      const startDate = value || formik.values.startDateTime;
      const updatedEndDate = addHours(startDate, 1);
      formik.setFieldValue(dependentField, updatedEndDate);
    }

    // handle blurring the field
    await formik.setFieldTouched(changeField, true);
    // validate both start and end in relation to each other
    await formik.validateField(changeField);
    await formik.validateField(dependentField);
  };

  return (
    <Dialog open={open} aria-labelledby="edit-event-dialog-title" className="EventForm--Dailog" onClose={onCancel}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DialogTitle title={title} subtitle={subtitle} onClose={() => formik.handleReset(formik.initialValues)} />
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Typography variant="overline">Event</Typography>
              <TextField
                data-testid="Edit-Event--event-name"
                name="eventName"
                fullWidth
                margin="dense"
                label="Name"
                placeholder="Name"
                value={formik.values.eventName}
                onChange={formik.handleChange}
                onBlur={() => {
                  formik.setFieldTouched('eventName', true);
                  formik.validateField('eventName');
                }}
                error={formik.touched.eventName && Boolean(formik.errors.eventName)}
                helperText={formik.touched.eventName && formik.errors.eventName}
              />

              <SelectLTHS
                name="eventType"
                label="Type"
                placeholder="Type"
                //  parsing and stringifying in order to keep {value, label} structure in order
                value={
                  formik.values.eventType
                    ? JSON.stringify({
                        value: formik.values.eventType.id,
                        label: formik.values.eventType.label,
                      })
                    : null
                }
                helperText=""
                error={formik.touched.eventType && Boolean(formik.errors.eventType)}
                onBlur={() => formik.setFieldTouched('eventType', true)}
                onChange={async ({ target: value }) => {
                  formik.setFieldValue('eventType', JSON.parse(value.value as string));
                  await formik.validateField('eventType');
                }}
                options={availableEventTypes}
                noOptionsAvailableText="Sorry, No available event types."
              />

              <TextField
                id="Edit-Event--description"
                name="description"
                label="Description"
                placeholder="Description (optional)"
                multiline
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
              />
            </FormGroup>

            {/* DATE TIME FORM  */}
            <FormGroup sx={{ marginTop: pxToRem(16) }}>
              <Typography variant="overline">Schedule</Typography>
              <Box mb={0.5}>
                {/* Start Date */}
                <DatePickerLTHS
                  mode={formik.values.isAllDay ? 'date' : 'datetime'}
                  value={formik.values.startDateTime}
                  label="Start date"
                  placeholder="Start date"
                  onChange={(value) => {
                    handleDateTimeChange(value, 'startDateTime');
                  }}
                  onBlur={() => {
                    handleDateTimeChange(null, 'startDateTime');
                  }}
                  error={formik.touched.startDateTime && Boolean(formik.errors.startDateTime)}
                  helperText={!formik.touched.startDateTime ? undefined : (formik.errors.startDateTime as string)}
                />

                {/* End Date */}
                <DatePickerLTHS
                  mode={formik.values.isAllDay ? 'date' : 'datetime'}
                  value={formik.values.endDateTime}
                  label="End date"
                  placeholder="End date"
                  minDate={formik.values.startDateTime || undefined}
                  onChange={async (value) => {
                    handleDateTimeChange(value, 'endDateTime');
                  }}
                  onBlur={() => {
                    handleDateTimeChange(null, 'endDateTime');
                  }}
                  error={formik.touched.endDateTime && Boolean(formik.errors.endDateTime)}
                  helperText={!formik.touched.endDateTime ? undefined : (formik.errors.endDateTime as string)}
                />
              </Box>
              {/*  DATE TIME FORM */}

              <Box display="flex" justifyContent="space-between"></Box>
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
                  width: 'fit-content',
                  ml: 0.89, // force the checkox to align with the calendar icon
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
