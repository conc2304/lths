import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Add, CheckCircle, Edit, FilterAlt, FilterAltOffOutlined, HighlightOff } from '@mui/icons-material';
import { isEqual } from 'lodash';

import { MultiSelectWithChip, RowBuilderFn, SearchBar, Table, TableColumnHeader } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';
import { filterObjectsBySearch, getUniqueValuesByKey } from '@lths/shared/utils';

import { featureFlagDataMock } from '../../mockFeatures';
import { FeatureFlag } from '../../types';
import { FeatureFlagFormModal } from '../form-modal/feature-flag-form-modal';

type FilterOption = [id: string | number, value: string | number];

const featureFlagData = featureFlagDataMock;

const FeatureFlagPage = () => {
  // Api Calls

  // State
  const showAllValue: [string, string] = ['all', 'Show All'];

  const [search, setSearch] = useState('');
  const [modulesFilteredOn, setModulesFilteredOn] = useState<FilterOption[]>([showAllValue]);
  const [filterByFeatureState, setFilterByFeatureState] = useState<true | false | null>(null);
  const availableModules = getUniqueValuesByKey(featureFlagData, 'module').map((value, i) => [i, value]);
  const filtersFormIsClean =
    search === '' && isEqual(modulesFilteredOn, [showAllValue]) && filterByFeatureState === null;

  const [modalOpen, setModalOpen] = useState(false);
  const [formFeatureValues, setFormFeatureFlag] = useState<FeatureFlag | null>(null);
  // Data Fetching Params

  // Initialization
  const init = async () => {
    console.log('init');
  };

  useEffect(() => {
    init();
  }, []);

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
            <Button onClick={() => setModalOpen(true)} variant="contained" startIcon={<Add />}>
              NEW FLAG
            </Button>
          </Stack>
        }
      />
      <Box></Box>
      <FeatureFlagFormModal
        open={modalOpen}
        availableModules={availableModules.map(([, label]) => label.toString())}
        onClose={() => setModalOpen(false)}
        // formValues={formFeatureValues}
      />
    </Box>
  );
};

export default FeatureFlagPage;
