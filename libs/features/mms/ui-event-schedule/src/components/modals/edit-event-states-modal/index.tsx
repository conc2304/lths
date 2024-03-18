import { ChangeEvent } from 'react';
import { DialogProps, Dialog, Typography, SxProps, Box } from '@mui/material';
import { format, getMinutes } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TMZ } from '@lths/shared/ui-calendar-scheduler';
import { DialogActions, DialogTitle } from '@lths/shared/ui-elements';

import { EventStateFormItem } from './event-state-form-item';
import { EVENT_TYPE } from '../../../constants';
import { EventState, EventStateID, MMSEvent } from '../../../types';
import { sortByEventState, updateEventStatesWithOffsets } from '../../../utils';
import { FormLabel, StyledDialogContent, dialogSubtitleText } from '../utils';

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
      <Box component="form" role="form" onSubmit={formik.handleSubmit} style={{ width: '23rem' }}>
        <DialogTitle
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

          {eventStates.sort(sortByEventState).map((eventState) => {
            const { desc, label, type, id } = eventState;
            if (type === EVENT_TYPE.GAME) {
              return (
                <EventStateFormItem
                  editable={false}
                  key={`form-item-${type}`}
                  id={id}
                  title={label}
                  desc={desc}
                  sx={{ py: 2.5 }}
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
                  sx={{ py: 2 }}
                />
              );
            }
          })}
        </StyledDialogContent>
        <DialogActions
          cancelText="CANCEL"
          confirmText="UPDATE EVENT STATES"
          onCancel={() => formik.handleReset(formik.initialValues)}
          isSubmitting={formik.isSubmitting}
          disabled={!formik.isValid || !formik.dirty}
        />
      </Box>
    </Dialog>
  );
};
