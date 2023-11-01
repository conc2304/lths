import { useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { isEqual } from 'lodash';
import { Views } from 'react-big-calendar';

import { LTHSView, ViewMode } from '@lths/shared/ui-calendar-scheduler';
import { IOSSwitch, InfoTooltip } from '@lths/shared/ui-elements';
import { pxToRem } from '@lths/shared/utils';

import { SelectChipRenderer } from './select-chip-renderer';
import { EventType } from '../../types';

export type EventTypeFilterProps = {
  eventTypes: EventType[];
  onFilterChange?: (values: FilterOption[]) => void;
  onViewEventStates?: (value: boolean) => void;
  viewMode: ViewMode;
  view: LTHSView;
};

type FilterOption = [id: string, value: string];

const MenuItemFontStyle = {
  fontSize: pxToRem(12),
  lineHeight: pxToRem(22),
  letterSpacing: '0.15px',
  pl: pxToRem(8),
};

const FormLabelFontStyle = (theme: Theme) => ({
  fontSize: pxToRem(12),
  fontWeight: 'bold',
  lineHeight: pxToRem(18),
  mt: theme.spacing(0.35),
  letterSpacing: '0.15px',
});

export const EventTypeFilter = (props: EventTypeFilterProps) => {
  const { eventTypes, onViewEventStates, onFilterChange, viewMode, view } = props;
  const theme = useTheme();
  const showAllValue: [string, string] = ['all', 'Show All'];

  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([showAllValue]);
  const [eventStatesVisible, setEventStatesVisible] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const getStyles = (id: string) => {
    const isSelected = selectedFilters.findIndex(([fid]) => fid === id) >= 0;
    return {
      ...MenuItemFontStyle,
      fontWeight: isSelected ? 600 : 400,
    };
  };

  const handleSelectFilter = (event: SelectChangeEvent<typeof selectedFilters>) => {
    // values from the selection can only be strings or array of strings, so unfortunately no objects
    const { target } = event;
    const value = target.value;
    if (typeof value === 'string') return;

    // The most recent value is the value at the end of the array
    // Theoretically the `Show All` value should always be at the start or the end only

    // If a user clicks on the same item again then we want to remove it.
    // Get the last item of the values, then check if there is another occurence, then remove both

    function countOccurrences<T>(array: T[], value: T): number {
      return array.reduce((count, current) => count + (isEqual(current, value) ? 1 : 0), 0);
    }

    const lastEntry = value[value.length - 1];
    const lastEntryOccurrences = countOccurrences(value, lastEntry);
    const showAllIndex = value.findIndex(([id]) => id === showAllValue[0]);

    let nextState: typeof selectedFilters;
    if (showAllIndex === 0) {
      // adding a filter item when the last selection was 'Show All'
      nextState = value.filter(([fid]) => fid !== showAllValue[0]);
    } else if (showAllIndex === value.length - 1) {
      // Selecting the 'Show All' value
      nextState = [showAllValue];
    } else if (lastEntryOccurrences > 1) {
      // Removing a filter item when it is clicked again
      nextState = value.filter(([fid]) => lastEntry[0] !== fid);
      if (nextState.length === 0) nextState.push(showAllValue);
    } else {
      // Selecting a regular filter
      nextState = value;
    }

    setSelectedFilters(nextState); // or external handler
    onFilterChange && onFilterChange(nextState);
  };

  const handleReset = () => {
    setSelectedFilters([showAllValue]);
    onFilterChange && onFilterChange([showAllValue]);
  };

  const handleRemoveFilter = (id: string) => {
    const newState = selectedFilters.filter(([fid]) => fid !== id);
    if (newState.length === 0) newState.push(showAllValue);
    setSelectedFilters(newState);
  };

  const handleViewEventStatesToggle = (nextState: boolean) => {
    setEventStatesVisible(nextState);
    onViewEventStates && onViewEventStates(nextState);
  };

  return (
    <Box
      className="EventTypeFilter--root"
      display="flex"
      justifyContent={'space-between'}
      alignContent={'center'}
      sx={{
        backgroundColor: theme.palette.grey[100],
        py: pxToRem(26),
        px: pxToRem(22),
        borderTop: `1px solid ${theme.palette.grey[500]}`,
        borderBottom: `1px solid ${theme.palette.grey[500]}`,
      }}
    >
      <Box
        className="EventTypeFilter--select-types"
        display="flex"
        justifyContent={'flex-start'}
        alignItems={'center'}
        width="75%"
        sx={{}}
      >
        <Box display="flex" minWidth={130} alignContent={'center'} sx={{ mr: theme.spacing(2.25) }}>
          <Box>
            <Typography
              sx={{
                ...FormLabelFontStyle(theme),
                mr: theme.spacing(1),
              }}
            >
              View event types
            </Typography>
          </Box>
          <Box pt={0.25}>
            <InfoTooltip description="Event Types are the type of events that you can filter on" />
          </Box>
        </Box>

        <FormControl sx={{ width: '500px' }}>
          <Select
            labelId="event-type-filter-label"
            data-testid="Calendar-toolbar--filter-select"
            multiple
            value={selectedFilters}
            onChange={handleSelectFilter}
            input={<OutlinedInput id="select-multiple-chip" />}
            ref={containerRef}
            sx={{
              width: '100%',
              backgroundColor: '#FFF',
              color: '#000',
              height: pxToRem(41),
              boxShadow: '0px 2px 2px 0px #00000026 inset',
              '& .MuiSelect-select': { py: theme.spacing(0.9), pl: theme.spacing(0.5) },
            }}
            placeholder="Show All"
            renderValue={(selected: FilterOption[]) => {
              // !! renderValue runs before useLayoutEffect in SelectedChipRenderer will run when add/removing, and then again on menu blur,
              // !! which causes some weirdness and delays in calculating number of chips to render
              // So in lieu of that we are hardcoding the chip limit
              return <SelectChipRenderer selectedItems={selected} onRemoveItem={handleRemoveFilter} chipLimit={3} />;
            }}
          >
            <MenuItem key={showAllValue[0]} value={showAllValue} sx={getStyles(showAllValue[1])}>
              Show all
            </MenuItem>
            {eventTypes.map(({ id, label }) => (
              // value can only be a string
              <MenuItem key={id} value={[id, label]} style={getStyles(id)}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedFilters.some(([id]) => id !== showAllValue[0]) && (
          <Button
            variant="text"
            color="secondaryButton"
            sx={{ fontWeight: 'bold' }}
            disableRipple
            onClick={() => handleReset()}
          >
            Reset
          </Button>
        )}
      </Box>

      {viewMode === 'calendar' && [Views.DAY.toString(), Views.WEEK.toString()].includes(view) && (
        <Box className="EventTypeFilter--toggle-states" display="flex" alignItems={'center'}>
          <Box display="flex" alignContent={'center'} sx={{ mr: theme.spacing(2.25) }}>
            <Box>
              <Typography
                id="event-states-toggle-label"
                sx={{
                  ...FormLabelFontStyle(theme),
                  mr: theme.spacing(1),
                }}
              >
                View event states
              </Typography>
            </Box>
            <Box pt={0.25}>
              <InfoTooltip description="Event States are defined as 'Event Day', 'Pre-Event', 'In-Event', and 'Post-Event'." />
            </Box>
          </Box>

          <FormGroup>
            <IOSSwitch
              aria-labelledby="event-states-toggle-label"
              sx={{ m: 1 }}
              value={eventStatesVisible}
              trackActiveColor={theme.palette.secondaryButton.light}
              trackInactiveColor={theme.palette.grey[500]}
              size="medium"
              thumbColor={theme.palette.grey[100]}
              onClick={() => handleViewEventStatesToggle(!eventStatesVisible)}
            />
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};
