import { SyntheticEvent } from 'react';
import { Autocomplete, AutocompleteRenderGetTagProps, Box, Chip, TextField, Typography } from '@mui/material';

import { EnumValue, EventItem } from '@lths/features/mms/data-access';

import { colors } from '../../../common';
import { EventStatesData } from '../../types';
import { ChangeEventState } from '../types';
import { formatDate, formatEventNameLabel } from '../utils';

type Props = {
  upcomingEvents: EventItem[];
  eventStates: EnumValue[];
  selectedEventStates: EventStatesData;
  onSelectEventStateChange: ChangeEventState;
};

const EventStateSelect = (props: Props) => {
  const { upcomingEvents = [], selectedEventStates = { events: [], states: [] }, onSelectEventStateChange } = props;

  const { events } = selectedEventStates;

  const getOptionLabel = (option: EventItem) =>
    `${formatEventNameLabel(option.type, option.name)} | ${formatDate(option.start_date_time)}`;

  const renderTags = (values: EventItem[], getTagProps: AutocompleteRenderGetTagProps) =>
    values.map((option, index) => {
      const label = `${formatEventNameLabel(option.type, option.name)} | ${formatDate(option.start_date_time)}`;
      return (
        <Chip
          label={label}
          {...getTagProps({ index })}
          key={option._id}
          sx={{ borderRadius: '4px', backgroundColor: colors.chip.color }}
        />
      );
    });

  const selectedEvents = upcomingEvents.filter((ue) => events.includes(ue._id));

  const handleEventsSelect = (e: SyntheticEvent, values: EventItem[]) =>
    onSelectEventStateChange(
      'events',
      values.map((v) => v._id)
    );

  return (
    <Box sx={{ marginLeft: 4, marginY: 2 }}>
      <Typography>CHOOSE EVENT(S)</Typography>
      <Autocomplete
        multiple
        id="multiple-events"
        options={upcomingEvents}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => <TextField {...params} />}
        renderTags={renderTags}
        value={selectedEvents}
        onChange={handleEventsSelect}
      />
    </Box>
  );
};

export default EventStateSelect;
