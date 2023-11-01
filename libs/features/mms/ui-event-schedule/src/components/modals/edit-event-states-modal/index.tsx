import { ChangeEvent } from 'react';
import { DialogProps, Dialog, Typography, SxProps, Box } from '@mui/material';
import { format, getMinutes } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TMZ } from '@lths/shared/ui-calendar-scheduler';

import { EventStateFormItem } from './event-state-form-item';
import { BACKGROUND_EVENT_STATES, EVENT_STATE, FOREGROUND_EVENT_STATES } from '../../../constants';
import { EventState, EventStateID, MMSEvent } from '../../../types';
import { sortByEventState, updateEventStatesWithOffsets } from '../../../utils';
import { CalendarDialogActions } from '../dialog-actions';
import { CalendarDialogTitle } from '../dialog-title';
import { FormLabel, StyledDialogContent, dialogSubtitleText } from '../utils';

export type EditEventStatesModalProps = DialogProps & {
  eventData: MMSEvent;
  onSave: (updatedEventStates: EventState[]) => void;
  onCancel: () => void;
};

export const EditEventStatesModal = (props: EditEventStatesModalProps) => {
  const { open, onSave, onCancel, eventData } = props;
  const { start, end, title, eventStates } = eventData;

  // Formik Initialization
  const initialValues = (() => {
    const values: Record<EventStateID | string, number | undefined> = {};

    eventStates?.forEach(({ state, relativeOffsetHrs }) => {
      values[state] = relativeOffsetHrs || 0;
    });

    return values;
  })();

  const validationSchema = Yup.object().shape({
    ...Object.keys(initialValues).reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: Yup.number().nullable().required('This field is required.'),
      }),
      {}
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!eventStates || !Object.keys(values).length) {
        setSubmitting(false);
        return;
      }

      // calculate the new start and end times for all of the values
      const updatedEventStates = updateEventStatesWithOffsets(eventStates, values);

      onSave(updatedEventStates);
      setSubmitting(false);
    },
    validateOnBlur: true,
    validateOnChange: true,
    onReset: () => {
      onCancel();
    },
  });

  const formattedEventDate = (start: Date, end: Date) => {
    const getFormattedTime = (date: Date) => (getMinutes(date) === 0 ? format(date, 'ha') : format(date, 'h:mma'));
    const dateFormat = 'EEEE, MMMM do, yyyy';
    const startDate = format(start, dateFormat);
    const startTime = getFormattedTime(start);
    const endTime = getFormattedTime(end);

    return `${startDate} | ${startTime} - ${endTime} ${TMZ}`;
  };

  const dateTitleSX: SxProps = {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '0.15px',
  };

  return (
    <Dialog open={open} aria-labelledby="edit-event-dialog-title" sx={{}} className="EditEventStates--root">
      <Box component="form" onSubmit={formik.handleSubmit} style={{ width: '23rem' }}>
        <CalendarDialogTitle
          title="Edit Event States"
          subtitle={dialogSubtitleText}
          onClose={() => formik.handleReset(formik.initialValues)}
        />
        <StyledDialogContent>
          <FormLabel>EVENT</FormLabel>
          {start && end && (
            <Typography
              sx={{
                pt: 0,
                ...dateTitleSX,
              }}
            >
              {formattedEventDate(start, end)}
            </Typography>
          )}
          <Typography
            sx={{
              maxWidth: '80%',
              ...dateTitleSX,
              pb: 1.5,
            }}
          >
            {title as string}
          </Typography>

          {eventStates
            ?.filter((eventState) => {
              const isBackgroundEventState = BACKGROUND_EVENT_STATES.includes(eventState.state);
              const isForegroundEventState = FOREGROUND_EVENT_STATES.includes(eventState.state);
              const isUnhandledEventState = !isForegroundEventState && !isBackgroundEventState;

              return !isUnhandledEventState;
            })
            ?.sort(sortByEventState)
            .map((eventState) => {
              const { desc, label, state, id } = eventState;
              if (state === EVENT_STATE.IN_EVENT) {
                return (
                  <EventStateFormItem
                    editable={false}
                    key={`form-item-${state}`}
                    id={id}
                    title={label}
                    desc={desc}
                    sx={{ py: 2.5 }}
                  />
                );
              } else {
                return (
                  <EventStateFormItem
                    key={`form-item-${state}`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue(state, Number(e.target.value));
                    }}
                    id={id}
                    title={label}
                    editable
                    desc={desc}
                    value={formik.values[state as EventStateID]}
                    sx={{ py: 2 }}
                  />
                );
              }
            })}
        </StyledDialogContent>
        <CalendarDialogActions
          cancelText="CANCEL"
          confirmText="UPDATE EVENT STATES"
          onCancel={() => formik.handleReset(formik.initialValues)}
          isSubmitting={formik.isSubmitting}
        />
      </Box>
    </Dialog>
  );
};
