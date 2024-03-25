import { ChangeEvent } from 'react';
import { DialogProps, Typography, Box } from '@mui/material';
import { format, getMinutes } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TMZ } from '@lths/shared/ui-calendar-scheduler';
import { DialogForm } from '@lths/shared/ui-elements';

import { EventStateFormItem } from './event-state-form-item';
import { EVENT_TYPE } from '../../../constants';
import { EventState, EventStateID, MMSEvent } from '../../../types';
import { sortByEventState, updateEventStatesWithOffsets } from '../../../utils';

export type EditEventStatesModalProps = DialogProps & {
  eventData: MMSEvent;
  eventStates: EventState[];
  onSave: (updatedEventStates: EventState[]) => void;
  onCancel: () => void;
};

export const EditEventStatesModal = (props: EditEventStatesModalProps) => {
  const { open, onSave, onCancel, eventData, eventStates = [] } = props;
  const { start, end, title } = eventData;

  // Formik Initialization
  const initialValues = (() => {
    const values: Record<EventStateID | string, number | undefined> = {};

    eventStates?.forEach(({ type, relativeOffsetHrs }) => {
      values[type] = relativeOffsetHrs || 0;
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
    onSubmit: (values, { setSubmitting }): void => {
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

  const formattedEventTime = (start: Date, end: Date) => {
    const getFormattedTime = (date: Date) => (getMinutes(date) === 0 ? format(date, 'ha') : format(date, 'h:mma'));
    const startTime = getFormattedTime(start);
    const endTime = getFormattedTime(end);

    return `${startTime} - ${endTime} ${TMZ}`;
  };

  const dateFormat = 'EEEE, MMMM do, yyyy';
  const formattedDate = format(start || new Date(), dateFormat);
  const formattedTime = formattedEventTime(start || new Date(), end || new Date());

  return (
    <DialogForm
      open={open}
      aria-labelledby="edit-event-dialog-title"
      onClose={() => formik.handleReset(formik.initialValues)}
      title="Edit event states"
      cancelText="CANCEL"
      confirmText="UPDATE"
      isSubmitting={formik.isSubmitting}
      onSubmit={formik.handleSubmit}
      disabled={!formik.isValid || !formik.dirty}
      hasCloseButton
    >
      <Box>
        <Box mb={2}>
          <Typography variant="overline">EVENT</Typography>
          <Typography variant="body1">Name: {title}</Typography>
          <Typography variant="body1">Date: {formattedDate}</Typography>
          <Typography variant="body1">Time: {formattedTime}</Typography>
        </Box>

        <Typography variant="overline">STATES</Typography>

        {eventStates.sort(sortByEventState).map((eventState, i) => {
          const isFirst = i === 0;
          const isLast = i === eventStates.length - 1;

          const paddingMap = {
            first: '0.5rem 0 1rem 0',
            middle: '0 0 1rem 0',
            last: '0 0 0 0',
          };
          const pos = isFirst ? 'first' : isLast ? 'last' : 'middle';

          const { desc, label, type, id } = eventState;
          if (type === EVENT_TYPE.GAME) {
            return (
              <EventStateFormItem
                editable={false}
                key={`form-item-${type}`}
                id={id}
                title={label}
                desc={desc}
                sx={{ padding: paddingMap[pos] }}
              />
            );
          } else {
            return (
              <EventStateFormItem
                key={`form-item-${type}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue(type, Number(e.target.value));
                }}
                id={id}
                title={label}
                editable
                desc={desc}
                value={formik.values[type as EventStateID]}
                sx={{ padding: paddingMap[pos] }}
              />
            );
          }
        })}
      </Box>
    </DialogForm>
  );
};
