import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { EnumValue, EventConstraint, EventItem } from '@lths/features/mms/data-access';

import DateTimeRangePicker from './date-time-range-picker';
import EventStateSelect from './event-state-select';
import StateSelect from './state-select';
import { HeaderContainer } from '../../container';
import { Constraint, DateRangeData, EventStatesData, StatesData } from '../../types';
import { ChangeDateRange, ChangeEventState, ChangeState } from '../types';
import { findEventConstraintType, transformEventConstraintResponse, transformEventConstraintPayload } from '../utils';

type Props = {
  eventStates: EnumValue[];
  upcomingEvents: EventItem[];
  data: Record<string, string | string[]>[];
  onUpdate: (data: EventConstraint[]) => void;
};

export type DateTimeType = {
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
};

export type EventStateType = {
  events: string[];
  states: string[];
};

const defaultStates: StatesData = [];
const defaultEventStates: EventStatesData = { events: [], states: [] };
const defaultDateRange = [
  {
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  },
];

const EventConstraints = (props: Props) => {
  const { data, onUpdate, eventStates, upcomingEvents } = props;

  const { ALWAYS, SPECIFIC_STATES, SPECIFIC_EVENT_STATES, SPECIFIC_DATE_TIME } = Constraint;

  const [eventConstraintType, setEventConstraintType] = useState(ALWAYS);

  const { type, transformedData } = transformEventConstraintResponse(data);

  const selectedStates = type === SPECIFIC_STATES ? transformedData : defaultStates;
  const selectedEventStates = type === SPECIFIC_EVENT_STATES ? transformedData : defaultEventStates;
  const selectedDateRange = type === SPECIFIC_DATE_TIME ? transformedData : defaultDateRange;

  const handleEventConstraintTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as Constraint;
    setEventConstraintType(type);
    if (type === Constraint.ALWAYS) onUpdate([]);
  };

  const handleSelectedStatesChange: ChangeState = (event, checked) => {
    const updatedData = { state: event.target.value, checked };
    const transformedData = transformEventConstraintPayload(data, eventConstraintType, updatedData);
    onUpdate(transformedData);
  };

  const handleSelectedEventStatesChange: ChangeEventState = (type, values) => {
    const updatedData = { [type]: values } as Record<string, string | boolean | string[]>;
    const transformedData = transformEventConstraintPayload(data, eventConstraintType, updatedData);
    onUpdate(transformedData);
  };

  const handleDateRangeAdd = () => {
    const updatedData = [...data, {}];
    onUpdate(updatedData);
  };

  const handleDateRangeChange: ChangeDateRange = (key, value) => {
    const updatedData = { key, value } as Record<string, Date | string>;
    const transformedData = transformEventConstraintPayload(data, eventConstraintType, updatedData);
    onUpdate(transformedData);
  };

  const handleDateRangeRemove = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    onUpdate(updatedData);
  };

  useEffect(() => {
    if (data.length > 0) {
      const constraintType = findEventConstraintType(data);
      setEventConstraintType(constraintType);
    }
  }, [data]);

  return (
    <Box>
      <HeaderContainer
        title="When do you want this page to display?"
        description="This page will only display during these times."
        infoText="These are derived from the dynamic schedule. If you want to add more dates or event states to be available go to the schedule to add them."
      />
      <FormControl sx={{ marginTop: 6 }}>
        <RadioGroup
          defaultValue={Constraint.ALWAYS}
          value={eventConstraintType}
          onChange={handleEventConstraintTypeChange}
        >
          <FormControlLabel value={Constraint.ALWAYS} control={<Radio />} label="Always show this page" />
          <FormControlLabel
            value={Constraint.SPECIFIC_STATES}
            control={<Radio />}
            label="Show this page before/after/during all events"
            sx={{
              marginTop: 1,
            }}
          />
          {eventConstraintType === Constraint.SPECIFIC_STATES && (
            <StateSelect
              eventStates={eventStates}
              selectedStates={selectedStates as StatesData}
              onSelectState={handleSelectedStatesChange}
            />
          )}
          <FormControlLabel
            value={Constraint.SPECIFIC_EVENT_STATES}
            control={<Radio />}
            label="Show this page before/after/during one or more events"
            sx={{
              marginTop: 1,
            }}
          />
          {eventConstraintType === Constraint.SPECIFIC_EVENT_STATES && (
            <EventStateSelect
              upcomingEvents={upcomingEvents}
              eventStates={eventStates}
              selectedEventStates={selectedEventStates as EventStateType}
              onSelectEventStateChange={handleSelectedEventStatesChange}
            />
          )}
          <FormControlLabel
            value={Constraint.SPECIFIC_DATE_TIME}
            control={<Radio />}
            label="Show this page during a discrete date/time range"
            sx={{
              marginTop: 1,
            }}
          />
          {eventConstraintType === Constraint.SPECIFIC_DATE_TIME && (
            <Box sx={{ marginLeft: 4 }}>
              <DateTimeRangePicker
                selectedDateRange={selectedDateRange as DateRangeData[]}
                onDateRangeAdd={handleDateRangeAdd}
                onDateRangeChange={handleDateRangeChange}
                onDateRangeRemove={handleDateRangeRemove}
              />
            </Box>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default EventConstraints;
