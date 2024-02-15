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
import {
  CheckCircle,
  Delete,
  Edit,
  FilterAlt,
  FilterAltOffOutlined,
  HighlightOff,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { isEqual } from 'lodash';

import { MultiSelectWithChip, RowBuilderFn, SearchBar, Table, TableColumnHeader } from '@lths/shared/ui-elements';
import { filterObjectsBySearch, getUniqueValuesByKey } from '@lths/shared/utils';

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

  const tableHeaders: TableColumnHeader<keyof FeatureFlag | 'edit' | 'delete'>[] = [
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
      align: 'center',
    },
    {
      id: 'edit',
      label: '',
      sortable: false,
      align: 'center',
      width: '35px',
    },
    {
      id: 'delete',
      label: '',
      sortable: false,
      align: 'center',
      width: '35px',
    },
  ];

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
      const { data } = props;

      return (
        <TableRow>
          <>
            {tableHeaders.map((col) => {
              if (col.id === 'edit') {
                return (
                  <TableCell key={col.id} size="small" align={col.align} width={col.width}>
                    <IconButton onClick={() => handleEditFlagClick(data)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                );
              }

              if (col.id === 'delete') {
                return (
                  <TableCell key={col.id} size="small" align={col.align} width={col.width}>
                    <IconButton onClick={() => handleDeleteFlagClick(data)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                );
              }

              const key = col.id;
              const cellValue = data[key];
              let content: ReactNode;

              if (typeof cellValue === 'boolean') {
                content = cellValue ? (
                  <Visibility fontSize="medium" htmlColor="#388E3C" />
                ) : (
                  <VisibilityOff fontSize="medium" color="disabled" />
                );
              } else {
                content = cellValue;
              }
              return (
                <TableCell
                  key={key}
                  size={key === 'enabled' ? 'small' : undefined}
                  align={col.align}
                  sx={{
                    pl: col.align === 'center' && col.sortable ? '-18px' : undefined,
                  }}
                >
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
      <Table data={filteredData} headerCells={tableHeaders} rowBuilder={RowBuilder()} rowsPerPage={10} />
    </Box>
  );
};
