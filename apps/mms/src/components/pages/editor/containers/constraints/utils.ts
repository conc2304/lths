import { isValid } from 'date-fns';

import { EventItem } from './types';

export const findEventConstraintType = (eventConstraints: Record<string, any>) => {
  const ec = eventConstraints[0];
  if (ec.start_date_time) return EventItem.SPECIFIC_DATE_TIME;
  else if (ec.event_id && ec.state_id) return EventItem.SPECIFIC_EVENT_STATES;
  else if (ec.state_id) return EventItem.SPECIFIC_STATES;
  else return EventItem.ALWAYS;
};

export const formatDateTime = (dateTime) => {
  return {
    startDate: new Date(dateTime.start_date_time),
    startTime: new Date(dateTime.start_date_time),
    endDate: new Date(dateTime.end_date_time),
    endTime: new Date(dateTime.end_date_time),
  };
};

export const constructEventConstraint = (
  eventConstraintType,
  selectedStates: string[],
  selectedEventStates,
  selectedDateTime
) => {
  if (eventConstraintType === EventItem.SPECIFIC_STATES) {
    return selectedStates.map((s) => ({ state_id: [s] }));
  } else if (eventConstraintType === EventItem.SPECIFIC_EVENT_STATES) {
    return selectedEventStates?.events?.map((i) => ({
      event_id: i,
      state_id: selectedEventStates.states,
    }));
  } else if (eventConstraintType === EventItem.SPECIFIC_DATE_TIME) {
    return selectedDateTime.map((dt) => constructDateTime(dt));
  }
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

export const constructDateTime = (dateTime) => {
  return {
    start_date_time: dateTime?.startTime
      ? formatDateTimeToISO(mergeDateAndTime(dateTime?.startDate, dateTime?.startTime))
      : formatDateTimeToISO(dateTime?.startDate),
    end_date_time: dateTime?.endTime
      ? formatDateTimeToISO(mergeDateAndTime(dateTime?.endDate, dateTime?.endTime))
      : formatDateTimeToISO(dateTime?.endDate),
  };
};
