import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  TableCell,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { CheckCircle, Edit, FilterAlt, FilterAltOffOutlined, HighlightOff } from '@mui/icons-material';
import { isEqual } from 'lodash';

import { MultiSelectWithChip, RowBuilderFn, SearchBar, Table, TableColumnHeader } from '@lths/shared/ui-elements';
import { filterObjectsBySearch, getUniqueValuesByKey } from '@lths/shared/utils';

import { FeatureFlag } from '../../types';

type FilterOption = [id: string | number, value: string | number];

type FeatureFlagTableProps = {
  featureFlags: FeatureFlag[];
  onEditFlagClick: (flagData: FeatureFlag) => void;
};

export const FeatureFlagTable = (props: FeatureFlagTableProps) => {
  const { featureFlags, onEditFlagClick } = props;

  const showAllValue: [string, string] = ['all', 'Show All'];

  const [search, setSearch] = useState('');
  const [modulesFilteredOn, setModulesFilteredOn] = useState<FilterOption[]>([showAllValue]);
  const [filterByFeatureState, setFilterByFeatureState] = useState<true | false | null>(null);
  const availableModules = getUniqueValuesByKey(featureFlags, 'module').map((value, i) => [i, value]);
  const filtersFormIsClean =
    search === '' && isEqual(modulesFilteredOn, [showAllValue]) && filterByFeatureState === null;

  const tableHeaders: TableColumnHeader<keyof FeatureFlag | 'edit'>[] = [
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
    {
      id: 'edit',
      label: '',
      sortable: false,
    },
  ];

  const featureStateFilteredData = featureFlags.slice().filter((feature) => {
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

  const handleEditFlagClick = (flagData: FeatureFlag) => {
    onEditFlagClick(flagData);
  };

  const RowBuilder = (): RowBuilderFn<FeatureFlag> => {
    return (props) => {
      const { data } = props;

      return (
        <TableRow>
          <>
            {tableHeaders.map((col) => {
              if (col.id === 'edit')
                return (
                  <IconButton onClick={() => handleEditFlagClick(data)}>
                    <Edit />
                  </IconButton>
                );

              const key = col.id;
              const cellValue = data[key];
              let content: ReactNode;

              if (typeof cellValue === 'boolean') {
                content = cellValue ? (
                  <CheckCircle fontSize="medium" htmlColor="#388E3C" />
                ) : (
                  <HighlightOff fontSize="medium" color="error" />
                );
              } else {
                content = cellValue;
              }
              return (
                <TableCell key={key} size={['edit', 'enabled'].includes(key) ? 'small' : undefined}>
                  {content}
                </TableCell>
              );
            })}
          </>
        </TableRow>
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
            showAllText="Show All Modules"
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
      <Table data={searchFilteredData} headerCells={tableHeaders} rowBuilder={RowBuilder()} rowsPerPage={10} />
    </Box>
  );
};
