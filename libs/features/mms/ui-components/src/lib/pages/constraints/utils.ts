import { format, isValid, parseISO } from 'date-fns';

import { EventConstraint } from '@lths/features/mms/data-access';

import { TransformEventConstraintPayload } from './types';
import { Constraint, ConstraintDateRange, DateRangeData, EventStatesData, StatesData } from '../types';

export const formatDateTime = (dateRange: ConstraintDateRange): DateRangeData => {
  const { start_date_time, end_date_time } = dateRange;
  const start = isValid(new Date(start_date_time)) ? new Date(start_date_time) : null;
  const end = isValid(new Date(end_date_time)) ? new Date(end_date_time) : null;
  return {
    startDate: start,
    startTime: start,
    endDate: end,
    endTime: end,
  };
};

const formatDateTimeToISO = (d: Date) => {
  return isValid(d) ? new Date(d).toISOString() : '';
};

const mergeDateAndTime = (date: Date, time: Date) => {
  if (isValid(date) && isValid(time)) {
    const newDate = new Date(date);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    return newDate;
  } else {
    return null;
  }
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return isValid(dateObj) ? format(new Date(date), 'MMM dd, yyyy') : '';
};

export const findEventConstraintType = (eventConstraints: EventConstraint[]) => {
  const item = eventConstraints[0];
  if (!item) return Constraint.ALWAYS;
  else if ('start_date_time' in item) return Constraint.SPECIFIC_DATE_TIME;
  else if ('event_id' in item && 'state_id' in item) return Constraint.SPECIFIC_EVENT_STATES;
  else if ('state_id' in item) return Constraint.SPECIFIC_STATES;
  else return Constraint.ALWAYS;
};

export const transformEventConstraintResponse = (
  data: EventConstraint[]
): { type: Constraint; transformedData: StatesData | EventStatesData | DateRangeData[] | null } => {
  const type = findEventConstraintType(data);
  let transformedData = null;
  switch (type) {
    case Constraint.SPECIFIC_STATES:
      transformedData = data.map((d) => d.state_id[0]);
      break;
    case Constraint.SPECIFIC_EVENT_STATES: {
      const states = data[0].state_id as string[];
      const events = data.map((d) => d.event_id) as string[];
      transformedData = {
        events,
        states,
      };
      break;
    }
    case Constraint.SPECIFIC_DATE_TIME:
      transformedData = data.map((d) => formatDateTime(d as ConstraintDateRange));
      break;
  }
  return {
    type,
    transformedData,
  };
};

const transformSpecificStatesPayload: TransformEventConstraintPayload = (data, type, selectedData) => {
  let updatedData = [...data];
  const { state, checked } = selectedData as { state: string; checked: boolean };
  const newState = { state_id: [state] };
  if (type === Constraint.SPECIFIC_STATES) {
    if (checked) {
      updatedData.push(newState);
    } else updatedData = updatedData.filter((d) => !d.state_id.includes(state));
  } else {
    updatedData = [newState];
  }
  return updatedData;
};

const transformSpecificEventStatesPayload: TransformEventConstraintPayload = (data, type, selectedData) => {
  let updatedData = [...data];
  const { events, states } = selectedData as { events: string[]; states: Record<string, string> };
  if (type === Constraint.SPECIFIC_EVENT_STATES) {
    const { state_id } = updatedData[0] as { state_id: string[] };
    if (events) {
      updatedData = [];
      events.forEach((e) => {
        updatedData.push({ event_id: e, state_id });
      });
    } else if (states) {
      const { value, checked } = states;
      const updatedStates = checked ? [...state_id, value] : state_id.filter((s) => s !== value);
      updatedData = updatedData.map((d) => {
        return {
          ...d,
          state_id: updatedStates,
        };
      });
    }
  } else {
    const newData = { event_id: '', state_id: [] } as EventConstraint;
    if (events) {
      newData.event_id = events[0];
    } else if (states) {
      newData.state_id = [states.id];
    }
    updatedData = [newData];
  }
  return updatedData;
};

const transformSpecificDateRangePayload: TransformEventConstraintPayload = (data, type, selectedData) => {
  let updatedData = [...data];
  const { key, value } = selectedData as { key: keyof DateRangeData; value: Date };
  const updatedKey = key.includes('start') ? 'start_date_time' : 'end_date_time';
  if (type === Constraint.SPECIFIC_DATE_TIME) {
    const index = updatedData.length - 1;
    const { start_date_time, end_date_time } = updatedData[index] as {
      start_date_time: string;
      end_date_time: string;
    };
    const parsedStartDateTime = start_date_time ? parseISO(start_date_time) : '';
    const parsedEndDateTime = end_date_time ? parseISO(end_date_time) : '';
    let updatedValue = null;
    if (key === 'startDate') updatedValue = parsedStartDateTime ? mergeDateAndTime(value, parsedStartDateTime) : value;
    else if (key === 'startTime')
      updatedValue = parsedStartDateTime ? mergeDateAndTime(parsedStartDateTime, value) : value;
    else if (key === 'endDate') updatedValue = parsedEndDateTime ? mergeDateAndTime(value, parsedEndDateTime) : value;
    else if (key === 'endTime') updatedValue = parsedEndDateTime ? mergeDateAndTime(parsedEndDateTime, value) : value;

    updatedData[index] = {
      ...updatedData[index],
      [updatedKey]: updatedValue ? formatDateTimeToISO(updatedValue) : '',
    };
  } else {
    const updatedValue = value ? formatDateTimeToISO(value) : '';
    updatedData = [
      {
        [updatedKey]: updatedValue,
      },
    ];
  }
  return updatedData;
};

export const transformEventConstraintPayload: TransformEventConstraintPayload = (data, selectedType, selectedData) => {
  let updatedData = [...data];
  const dataType = findEventConstraintType(updatedData);
  if (selectedType === Constraint.SPECIFIC_STATES) {
    updatedData = transformSpecificStatesPayload(data, dataType, selectedData);
  } else if (selectedType === Constraint.SPECIFIC_EVENT_STATES) {
    updatedData = transformSpecificEventStatesPayload(data, dataType, selectedData);
  } else if (selectedType === Constraint.SPECIFIC_DATE_TIME) {
    updatedData = transformSpecificDateRangePayload(data, dataType, selectedData);
  }
  return updatedData;
};
