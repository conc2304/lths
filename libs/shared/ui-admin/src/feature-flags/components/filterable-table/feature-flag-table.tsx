import { ChangeEvent, MouseEvent, useState } from 'react';
import { Box, Button, Checkbox, FormControl, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FilterAlt, FilterAltOffOutlined } from '@mui/icons-material';
import { FtFlagTableHeaders } from 'libs/shared/ui-admin/src/feature-flags/components/filterable-table/constants';
import { isEqual } from 'lodash';

import { MultiSelectWithChip, RowBuilderFn, SearchBar, Table } from '@lths/shared/ui-elements';
import { filterObjectsBySearch, getUniqueValuesByKey } from '@lths/shared/utils';

import { FtFlagRow } from './flag-row';
import { FeatureFlag } from '../../types';

type FilterOption = [id: string | number, value: string | number];

type FeatureFlagTableProps = {
  featureFlags: FeatureFlag[];
  onEditFlagClick?: (flagData: FeatureFlag) => void;
  onDeleteFlagClick?: (flagData: FeatureFlag) => void;
};

export const FeatureFlagTable = (props: FeatureFlagTableProps) => {
  const { featureFlags, onEditFlagClick, onDeleteFlagClick } = props;

  const showAllText = 'Show All Modules';
  const showAllValue: [string, string] = ['all', showAllText];

  const [search, setSearch] = useState('');
  const [modulesFilteredOn, setModulesFilteredOn] = useState<FilterOption[]>([showAllValue]);
  const [filterByFeatureState, setFilterByFeatureState] = useState<true | false | null>(null);
  const availableModules = getUniqueValuesByKey(featureFlags, 'module').map((value, i) => [i, value]);
  const filtersFormIsClean =
    search === '' && isEqual(modulesFilteredOn[0][0], showAllValue[0]) && filterByFeatureState === null;

  const filteredData = featureFlags.slice().filter((feature) => {
    // Check if the feature state matches the filter or if no filter is applied
    const isFeatureStateFiltered = filterByFeatureState === null || feature.enabled === filterByFeatureState;

    // Check if the module matches the filter or if all modules are selected
    const isModuleFiltered =
      isEqual(modulesFilteredOn[0][0], showAllValue[0]) || modulesFilteredOn.map((m) => m[1]).includes(feature.module);

    // Check if the feature matches the search query
    const isSearchFiltered = filterObjectsBySearch([feature], search).length > 0;

    return isFeatureStateFiltered && isModuleFiltered && isSearchFiltered;
  });

  //
  // Handlers
  //
  const handleOnSearch = (value: string) => {
    setSearch(value);
  };

  const handleSelectFilter = (selectedOptions: FilterOption[]) => {
    setModulesFilteredOn(selectedOptions);
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

  const handleEditFlagClick = (flagData: FeatureFlag) => {
    onEditFlagClick && onEditFlagClick(flagData);
  };

  const handleDeleteFlagClick = (flagData: FeatureFlag) => {
    onDeleteFlagClick && onDeleteFlagClick(flagData);
  };

  const RowBuilder = (): RowBuilderFn<FeatureFlag> => {
    return (props) => {
      const { data, headerCells } = props;

      return (
        <FtFlagRow
          flag={data}
          tableHeaders={headerCells}
          handleDeleteFlagClick={() => handleDeleteFlagClick(data)}
          handleEditFlagClick={() => handleEditFlagClick(data)}
        />
      );
    };
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <FormControl sx={{ width: '40%' }}>
          <MultiSelectWithChip
            value={modulesFilteredOn}
            options={availableModules as FilterOption[]}
            showAllValue={showAllValue}
            onChange={(selectedOptions) => handleSelectFilter(selectedOptions as FilterOption[])}
            color="secondary"
          />
        </FormControl>
        <FormControl sx={{ width: '25%' }}>
          <SearchBar value={search} onSearch={handleOnSearch} size="small" color="secondary" />
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
            color="secondary"
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
          <Button color="secondary" variant="outlined" onClick={handleReset} disabled={filtersFormIsClean}>
            Reset
          </Button>
        </FormControl>
      </Box>
      <Table data={filteredData} headerCells={FtFlagTableHeaders} rowBuilder={RowBuilder()} rowsPerPage={10} />
    </Box>
  );
};
