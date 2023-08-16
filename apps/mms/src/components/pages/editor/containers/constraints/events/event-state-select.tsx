import React from 'react';
import { Autocomplete, Box, Checkbox, Chip, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';

import { EnumValue, EventItem } from '@lths/features/mms/data-access';

import { EventStateType } from '.';

type Props = {
  upcomingEvents: EventItem[];
  eventStates: EnumValue[];
  selectedEventStates: EventStateType;
  onSelectEventStateChange: (
    type: 'states' | 'events',
    values: {
      checked: boolean;
      value: string;
    },
    events?: string[]
  ) => void;
};

const formatDate = (date) => format(new Date(date), 'MMM dd, yyyy');

const EventStateSelect = ({ upcomingEvents, eventStates, selectedEventStates, onSelectEventStateChange }: Props) => {
  return (
    <Box sx={{ marginLeft: 4, marginY: 2 }}>
      <Typography>CHOOSE EVENT(S)</Typography>
      <Autocomplete
        multiple
        id="multiple-events"
        options={upcomingEvents || []}
        getOptionLabel={(option) => `${option?.name} | ${formatDate(option?.start_date_time)}`}
        renderInput={(params) => <TextField {...params} />}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option.event_id}
              label={`${option?.name} | ${formatDate(option?.start_date_time)}`}
              {...getTagProps({ index })}
              sx={{ borderRadius: '4px', backgroundColor: '#D8D8D8' }}
            />
          ))
        }
        value={upcomingEvents?.filter((ue) => selectedEventStates.events.includes(ue._id))}
        onChange={(e, values) =>
          onSelectEventStateChange(
            'events',
            null,
            values.map((v) => v._id)
          )
        }
      />
      <FormGroup>
        {eventStates?.map((es) => (
          <FormControlLabel
            label={es?.name}
            key={es?.value}
            value={es?.value}
            control={
              <Checkbox
                onChange={(e) =>
                  onSelectEventStateChange('states', { checked: e.target.checked, value: e.target.value })
                }
                checked={selectedEventStates.states.includes(es?.value)}
              />
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default EventStateSelect;
