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

const formatDateTimeToISO = (d) => {
  return d ? new Date(d).toISOString() : '';
};

export const constructDateTime = (dateTime) => {
  return {
    start_date_time: dateTime?.startTime
      ? formatDateTimeToISO(dateTime?.startTime)
      : formatDateTimeToISO(dateTime?.startDate),
    end_date_time: dateTime?.end_time ? formatDateTimeToISO(dateTime?.endTime) : formatDateTimeToISO(dateTime?.endDate),
  };
};
