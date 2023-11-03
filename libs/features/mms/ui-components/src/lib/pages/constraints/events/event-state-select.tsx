import { ChangeEvent, SyntheticEvent } from 'react';
import {
  Autocomplete,
  AutocompleteRenderGetTagProps,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material';

import { EnumValue, EventItem } from '@lths/features/mms/data-access';

import { colors } from '../../../common';
import { EventStatesData } from '../../types';
import { ChangeEventState } from '../types';
import { formatDate } from '../utils';

type Props = {
  upcomingEvents: EventItem[];
  eventStates: EnumValue[];
  selectedEventStates: EventStatesData;
  onSelectEventStateChange: ChangeEventState;
};

const EventStateSelect = (props: Props) => {
  const {
    upcomingEvents = [],
    eventStates = [],
    selectedEventStates = { events: [], states: [] },
    onSelectEventStateChange,
  } = props;

  const { events, states } = selectedEventStates;

  const getOptionLabel = (option: EventItem) => `${option.name} | ${formatDate(option.start_date_time)}`;

  const renderTags = (values: EventItem[], getTagProps: AutocompleteRenderGetTagProps) =>
    values.map((option, index) => {
      const label = `${option.name} | ${formatDate(option.start_date_time)}`;
      return (
        <Chip
          label={label}
          {...getTagProps({ index })}
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

  const handleStatesSelect = (e: ChangeEvent<HTMLInputElement>) => {
    onSelectEventStateChange('states', { checked: e.target.checked, value: e.target.value });
  };
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
      <FormGroup>
        {eventStates.map((item) => {
          const { name, value } = item;
          const isChecked = states.includes(value);
          return (
            <FormControlLabel
              label={name}
              key={value}
              value={value}
              control={<Checkbox onChange={handleStatesSelect} checked={isChecked} />}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
};

export default EventStateSelect;
