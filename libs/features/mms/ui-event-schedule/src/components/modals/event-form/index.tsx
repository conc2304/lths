import { Box, FormGroup, FormControlLabel, Checkbox, TextField, Typography } from '@mui/material';
import { addHours, endOfDay, isAfter, isBefore, startOfDay } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DatePickerLTHS, DialogForm, SelectLTHS } from '@lths/shared/ui-elements';
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

  const initialValues: Omit<EventFormValues, 'eventType'> & { eventType: EventType | undefined } = {
    eventName: eventValues?.title ? eventValues.title.toString() : '',
    isAllDay: eventValues?.allDay !== undefined ? eventValues?.allDay : true,
    startDateTime: eventValues?.start ? new Date(eventValues.start) : null,
    endDateTime: eventValues?.end ? new Date(eventValues.end) : null,
    eventType: eventValues?.eventType || undefined,
    description: eventValues?.desc?.toString() || '',
    id: eventValues?.id,
    eventId: eventValues?.eventId,
  };

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().min(8, 'Name is too short').required('Required'),
    eventType: Yup.object().required('Required'),
    startDateTime: Yup.date().typeError('Invalid date').nullable().required('Required'),
    endDateTime: Yup.date()
      .typeError('Invalid date')
      .nullable()
      .test('valid-endDate', 'Invalid end date', function (value) {
        // not using yup.ref because we want to make sure start is set before validating
        if (!value || !this.parent['startDateTime']) return true;
        console.log(value, this.parent['startDateTime']);
        const result = !isBefore(value, this.parent['startDateTime']);
        console.log(result);
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
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onReset: () => {
      onCancel();
    },
  });

  const availableEventTypes = eventTypes
    .filter(({ id }) => !UNEDITABLE_EVENT_TYPES.map((e) => e.toString()).includes(id.toString()))
    .map((v) => ({ value: v.id, label: v.label }));

  const handleDateTimeChange = async (value: Date | null, field: 'startDateTime' | 'endDateTime') => {
    // datepickers don't play nice with formik change handlers, so we have to manually do it the onchange on blur things that formik.onChange would handle

    const changeField = field;
    const dependentField = field === 'startDateTime' ? 'endDateTime' : 'startDateTime';

    if (value) formik.setFieldValue(changeField, value, false);

    // if we move our start date past the end date, then move the end date to be an hour after start
    if (
      value && // current value not null
      changeField === 'startDateTime' && // only change when changing 'startdate'
      formik.values.endDateTime && // only change end if 'enddate' is set
      isAfter(value, formik.values.endDateTime) // only update is start is moved to after end
    ) {
      const startDate = value || formik.values.startDateTime;
      const updatedEndDate = addHours(startDate, 1);
      formik.setFieldValue(dependentField, updatedEndDate, false);
    }
    handleDateTimeBlur(field);
  };

  const handleDateTimeBlur = async (field: 'startDateTime' | 'endDateTime') => {
    const changeField = field;
    const dependentField = field === 'startDateTime' ? 'endDateTime' : 'startDateTime';

    await formik.setFieldTouched(changeField, true);
    // validate both start and end in relation to each other
    await formik.validateField(changeField);
    await formik.validateField(dependentField);
  };

  const handleAddTime = () => {
    formik.setFieldValue('isAllDay', false);
  };

  return (
    <DialogForm
      open={open}
      aria-labelledby="edit-event-dialog-title"
      title={title}
      subtitle={subtitle}
      onClose={() => formik.handleReset(formik.initialValues)}
      cancelText={cancelText}
      confirmText={confirmText}
      isSubmitting={formik.isSubmitting}
      disabled={!formik.isValid || !formik.dirty}
      onSubmit={formik.handleSubmit}
      hasCloseButton
    >
      <Box>
        <FormGroup>
          <Typography variant="overline">Event</Typography>
          <TextField
            data-testid="Edit-Event--event-name"
            fullWidth
            label="Name"
            placeholder="Name"
            value={formik.values.eventName}
            size="small"
            name="eventName"
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
            data-testid="Edit-Event--event-type"
            value={
              formik.values.eventType
                ? {
                    value: formik.values.eventType.id,
                    label: formik.values.eventType.label,
                  }
                : undefined
            }
            helperText={formik.touched.eventType && formik.errors.eventType?.toString()}
            error={formik.touched.eventType && Boolean(formik.errors.eventType)}
            onBlur={() => formik.setFieldTouched('eventType', true)}
            onChange={async (value) => {
              const formattedValue =
                value && typeof value === 'object' ? { label: value.label, id: value.value } : value;
              formik.setFieldValue('eventType', formattedValue);
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
            size="medium"
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
            <DatePickerLTHS
              mode={formik.values.isAllDay ? 'date' : 'datetime'}
              value={formik.values.startDateTime}
              label="Start date"
              placeholder="Start date"
              onAddTime={handleAddTime}
              onChange={(value) => {
                handleDateTimeChange(value, 'startDateTime');
              }}
              onBlur={() => {
                handleDateTimeBlur('startDateTime');
              }}
              error={formik.touched.startDateTime && Boolean(formik.errors.startDateTime)}
              helperText={!formik.touched.startDateTime ? undefined : (formik.errors.startDateTime as string)}
            />

            <DatePickerLTHS
              mode={formik.values.isAllDay ? 'date' : 'datetime'}
              value={formik.values.endDateTime}
              label="End date"
              placeholder="End date"
              minDate={formik.values.startDateTime || undefined}
              onAddTime={handleAddTime}
              onChange={async (value) => {
                handleDateTimeChange(value, 'endDateTime');
              }}
              onBlur={() => {
                handleDateTimeBlur('endDateTime');
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
    </DialogForm>
  );
};
