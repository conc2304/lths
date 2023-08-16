import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { EnumValue, useLazyGetEnumListQuery, useLazyGetUpcomingEventsQuery } from '@lths/features/mms/data-access';

import DateTimeRangePicker, { DateRange } from './date-time-range-picker';
import EventStateSelect from './event-state-select';
import StateSelect from './state-select';
import { HeaderContainer } from '../../core';
import { EventItem } from '../types';
import { constructEventConstraint, findEventConstraintType, formatDateTime } from '../utils';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  onUpdate: (constraints: Record<string, any>[]) => void;
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

const EventConstraints = ({ data, onUpdate }: Props) => {
  const [getUpcomingEvents, { data: upcomingEvents }] = useLazyGetUpcomingEventsQuery();
  const [getEnumList] = useLazyGetEnumListQuery();

  const [eventConstraintType, setEventConstraintType] = useState(EventItem.ALWAYS);
  const [eventStates, setEventStates] = useState<EnumValue[]>(null);

  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedEventStates, setSelectedEventStates] = useState<EventStateType>({ events: [], states: [] });

  const [selectedDateTime, setSelectedDateTime] = useState<DateTimeType[]>([]);

  const handleEventConstraintTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventConstraintType(e.target.value as EventItem);
  };

  const handleDateRangeSelect = (dateRange: DateRange[]) => {
    setSelectedDateTime(dateRange);
  };

  const handleSelectedStatesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStates((prevState) => {
      if (event.target.checked) {
        return [...prevState, event.target.value];
      } else {
        return prevState.filter((s) => s !== event.target.value);
      }
    });
  };

  const handleSelectedEventStatesChange = (
    type: 'states' | 'events',
    values: {
      checked: boolean;
      value: string;
    },
    events?: string[]
  ) => {
    setSelectedEventStates((prevState) => {
      if (type === 'states') {
        if (values.checked) {
          return { ...prevState, states: [...prevState.states, values.value] };
        } else {
          return { ...prevState, states: prevState.states.filter((s) => s !== values.value) };
        }
      } else if (type === 'events') {
        return {
          ...prevState,
          events: events,
        };
      }
    });
  };

  const fetchEventStates = async (enum_id: string) => {
    try {
      const response = await getEnumList(enum_id).unwrap();
      if (response?.success) setEventStates(response?.data?.enum_values);
    } catch (error) {
      console.error(`Error in fetching event state list`);
    }
  };

  useEffect(() => {
    fetchEventStates('EventState');
    getUpcomingEvents();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const constraintType = findEventConstraintType(data);
      setEventConstraintType(constraintType);
      if (constraintType === EventItem.SPECIFIC_STATES) setSelectedStates(data.map((ec) => ec.state_id[0]));
      else if (constraintType === EventItem.SPECIFIC_DATE_TIME) {
        setSelectedDateTime(data.map((ec) => formatDateTime(ec)));
      } else if (constraintType === EventItem.SPECIFIC_EVENT_STATES) {
        const states = data[0].state_id;
        const events = data.map((ec) => ec.event_id);
        setSelectedEventStates({
          events,
          states,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    onUpdate(constructEventConstraint(eventConstraintType, selectedStates, selectedEventStates, selectedDateTime));
  }, [eventConstraintType, selectedStates, selectedEventStates, selectedDateTime]);

  return (
    <Box>
      <HeaderContainer
        title="When do you want this page to display?"
        description="This page will only display during these times."
        infoText="These are derived from the dynamic schedule. If you want to add more dates or event states to be available go to the schedule to add them."
      />
      <FormControl sx={{ marginTop: 6 }}>
        <RadioGroup
          defaultValue={EventItem.ALWAYS}
          value={eventConstraintType}
          onChange={handleEventConstraintTypeChange}
        >
          <FormControlLabel value={EventItem.ALWAYS} control={<Radio />} label="Always show this page" />
          <FormControlLabel
            value={EventItem.SPECIFIC_STATES}
            control={<Radio />}
            label="Show this page before/after/during all events"
            sx={{
              marginTop: 1,
            }}
          />
          {eventConstraintType === EventItem.SPECIFIC_STATES && (
            <StateSelect
              eventStates={eventStates}
              selectedStates={selectedStates}
              onSelectState={handleSelectedStatesChange}
            />
          )}
          <FormControlLabel
            value={EventItem.SPECIFIC_EVENT_STATES}
            control={<Radio />}
            label="Show this page before/after/during one or more events"
            sx={{
              marginTop: 1,
            }}
          />
          {eventConstraintType === EventItem.SPECIFIC_EVENT_STATES && (
            <EventStateSelect
              upcomingEvents={upcomingEvents?.data}
              eventStates={eventStates}
              selectedEventStates={selectedEventStates}
              onSelectEventStateChange={handleSelectedEventStatesChange}
            />
          )}
          <FormControlLabel
            value={EventItem.SPECIFIC_DATE_TIME}
            control={<Radio />}
            label="Show this page during a discrete date/time range"
            sx={{
              marginTop: 1,
            }}
          />
          {eventConstraintType === EventItem.SPECIFIC_DATE_TIME && (
            <Box sx={{ marginLeft: 4 }}>
              <DateTimeRangePicker onDateRangeSelect={handleDateRangeSelect} />
            </Box>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default EventConstraints;
