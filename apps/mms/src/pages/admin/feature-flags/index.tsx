import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControl, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FilterAlt, FilterAltOffOutlined } from '@mui/icons-material';

import { MultiSelectWithChip, SearchBar, Table, TableColumnHeader } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';
import { filterObjectsBySearch, getUniqueValuesByKey } from '@lths/shared/utils';

import { AddFlagModal } from './add-flag-modal';
import { generateMockFlags } from './mockFeatures';

const featureFlagData = generateMockFlags(50);
type FilterOption = [id: string | number, value: string | number];

const FeatureFlagPage = () => {
  // Api Calls

  // State
  const showAllValue: [string, string] = ['all', 'Show All'];

  const [search, setSearch] = useState('');
  const [modulesFilteredOn, setModulesFilteredOn] = useState<FilterOption[]>([showAllValue]);
  const [filterByFeatureState, setFilterByFeatureState] = useState<true | false | null>(null);
  const availableModules = getUniqueValuesByKey(featureFlagData, 'module').map((value, i) => [i, value]);

  console.log(1, { availableModules });
  const [modalOpen, setModalOpen] = useState(false);
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

  const featureStateFilteredData = featureFlagData.slice().filter((feature) => {
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

  return (
    <Box
      className="MMS-Schedule-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader
        title="Feature Flags"
        sx={{ mt: '1rem', mb: '3.5rem' }}
        rightContent={
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button onClick={() => setModalOpen(true)}>CREATE NEW FLAG</Button>
          </Stack>
        }
      />
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
              showAllText="Show All Modules"
              onChange={handleSelectFilter}
            />
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
            <Button color="primary" variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </FormControl>
        </Box>
        <Table data={searchFilteredData} headerCells={tableHeaders} />
      </Box>
      <AddFlagModal
        open={modalOpen}
        availableModules={availableModules.map(([, label]) => label.toString())}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default FeatureFlagPage;
