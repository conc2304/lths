import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { FilterAlt, FilterAltOffOutlined } from '@mui/icons-material';
import { isEqual } from 'lodash';

import { MultiChipSelect, SearchBar, Table, TableColumnHeader } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';
import { filterObjectsBySearch, getUniqueValuesByKey, pxToRem } from '@lths/shared/utils';

import { generateMockFlags } from './mockFeatures';

const featureFlagData = generateMockFlags(50);
type FilterOption = [id: string, value: string];

const FeatureFlagPage = () => {
  // Api Calls

  // State
  const showAllValue: [string, string] = ['all', 'Show All'];
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [modulesFilteredOn, setModulesFilteredOn] = useState<FilterOption[]>([showAllValue]);
  const [filterByFeatureState, setFilterByFeatureState] = useState<true | false | null>(null);
  const availableModules = getUniqueValuesByKey(featureFlagData, 'module').map((value, i) => [i, value]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Data Fetching Params

  // Initialization
  const init = async () => {
    console.log('init');
  };

  useEffect(() => {
    init();
  }, []);

  const tableHeaders: TableColumnHeader[] = [
    {
      id: 'module',
      label: 'module',
      sortable: true,
    },
    {
      id: 'title',
      label: 'title',
      sortable: true,
    },
    {
      id: 'description',
      label: 'description',
      sortable: true,
    },
    {
      id: 'enabled',
      label: 'enabled',
      sortable: true,
    },
  ];

  const featureStateFilteredData = featureFlagData.filter((feature) => {
    if (filterByFeatureState === null) return true;
    return filterByFeatureState === feature.enabled;
  });

  const moduleFilteredData =
    modulesFilteredOn[0] === showAllValue
      ? featureStateFilteredData
      : featureStateFilteredData.filter((feature) => modulesFilteredOn.map((m) => m[1]).includes(feature.module));
  const searchFilteredData = filterObjectsBySearch(moduleFilteredData, search);
  const handleOnSearch = (value: string) => {
    setSearch(value);
  };

  const handleSelectFilter = (event: SelectChangeEvent<typeof modulesFilteredOn>) => {
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

    let nextState: typeof modulesFilteredOn;
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

    setModulesFilteredOn(nextState); // or external handler
    // onFilterChange && onFilterChange(nextState);
  };

  const handleReset = () => {
    setModulesFilteredOn([showAllValue]);
    setSearch('');
    setFilterByFeatureState(null);
  };

  const handleFeatureEnableFilterChange = (_: MouseEvent<HTMLElement>, nextView: boolean | null) => {
    setFilterByFeatureState(nextView);
  };

  const handleEnableFilterToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (!isChecked) setFilterByFeatureState(null);
  };

  const handleRemoveFilter = (id: string) => {
    const newState = modulesFilteredOn.filter(([fid]) => fid !== id);
    if (newState.length === 0) newState.push(showAllValue);
    setModulesFilteredOn(newState);
  };
  const MenuItemFontStyle = {
    fontSize: pxToRem(12),
    lineHeight: pxToRem(22),
    letterSpacing: '0.15px',
    pl: pxToRem(8),
  };
  const getStyles = (id: string) => {
    const isSelected = modulesFilteredOn.findIndex(([fid]) => fid === id) >= 0;
    return {
      ...MenuItemFontStyle,
      fontWeight: isSelected ? 600 : 400,
    };
  };
  return (
    <Box
      className="MMS-Schedule-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader title="Feature Flags" sx={{ mt: '1rem', mb: '3.5rem' }} />
      <Box>
        <Typography>Filter Bar</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <FormControl sx={{ width: '40%' }}>
            <Select
              labelId="event-type-filter-label"
              data-testid="Calendar-toolbar--filter-select"
              multiple
              value={modulesFilteredOn}
              onChange={handleSelectFilter}
              input={<OutlinedInput id="select-multiple-chip" />}
              ref={containerRef}
              size="small"
              sx={{
                width: '100%',
                backgroundColor: '#FFF',
                color: '#000',
                height: pxToRem(40),
                boxShadow: '0px 2px 2px 0px #00000026 inset',
                '& .MuiSelect-select': { py: theme.spacing(0.9), pl: theme.spacing(0.5) },
              }}
              placeholder="Show All"
              renderValue={(selected: FilterOption[]) => {
                // !! renderValue runs before useLayoutEffect in SelectedChipRenderer will run when add/removing, and then again on menu blur,
                // !! which causes some weirdness and delays in calculating number of chips to render
                // So in lieu of that we are hardcoding the chip limit
                return <MultiChipSelect selectedItems={selected} onRemoveItem={handleRemoveFilter} chipLimit={3} />;
              }}
            >
              <MenuItem key={showAllValue[0]} value={showAllValue} sx={getStyles(showAllValue[1])}>
                Show all
              </MenuItem>
              {availableModules.map(([id, label]) => {
                console.log([id, label]);

                return (
                  // value can only be a string
                  <MenuItem
                    key={id.toString()}
                    value={[id.toString(), label.toString()]}
                    style={getStyles(label.toString())}
                  >
                    {label.toString()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '25%' }}>
            <SearchBar value={search} onSearch={handleOnSearch} size="small" />
          </FormControl>
          <FormControl
            sx={{
              width: '20%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              flexDirection: 'row',
            }}
          >
            <Checkbox
              inputProps={{
                'aria-label': 'Filter On',
              }}
              icon={<FilterAltOffOutlined />}
              checkedIcon={<FilterAlt />}
              checked={filterByFeatureState !== null}
              onChange={handleEnableFilterToggleChange}
            />
            <ToggleButtonGroup
              color="secondary"
              exclusive
              value={filterByFeatureState}
              onChange={handleFeatureEnableFilterChange}
            >
              <ToggleButton value={true}>Enabled</ToggleButton>
              <ToggleButton value={false}>Disabled</ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
          <FormControl>
            <Button color="secondary" variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </FormControl>
        </Box>
        <Table data={searchFilteredData} headerCells={tableHeaders} />
      </Box>
    </Box>
  );
};

export default FeatureFlagPage;
