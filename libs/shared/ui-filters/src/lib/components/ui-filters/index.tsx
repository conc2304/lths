import { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';

import { ChipContainer, DateRangeSelector, FilterForm } from '@lths/shared/ui-elements';
import {
  AddGroupItems,
  AddItem,
  ClearForm,
  ClearGroup,
  DateFilterOptions,
  DateRange,
  FilterFormState,
  FormSchema,
  FormState,
  RemoveItem,
  SelectedUiFilters,
  SetDateRange,
  SetFormState,
} from '@lths/types/ui-filters';

import { getInitialDateRange, getInitialFormState } from '../../utils/index';

export interface UiFilterProps {
  isLoading?: boolean;
  onApplyFilters: (appliedFilters: SelectedUiFilters) => void;
  onChange?: (appliedFilters: SelectedUiFilters) => void;
  // Dates
  dateOptions: DateFilterOptions;
  dateRangeValue: DateRange;
  setDateRange: SetDateRange;
  // Filters
  formSchema: FormSchema[];
  formState: FormState;
  setFormState: SetFormState;
  removeItem: RemoveItem;
  addItem: AddItem;
  addGroupItems: AddGroupItems;
  clearGroup: ClearGroup;
  clearForm: ClearForm;
}

export const UiFilters = (props: UiFilterProps): JSX.Element => {
  const {
    isLoading = false,
    onApplyFilters,
    onChange,
    // Dates
    dateOptions,
    setDateRange,
    dateRangeValue: dateRangeState,
    // Filters
    formSchema,
    formState,
    setFormState,
    removeItem,
    addItem,
    addGroupItems,
    clearGroup,
    clearForm,
  } = props;

  const initialFormState = useRef(formSchema ? getInitialFormState(formSchema) : null);
  const initialDateRange = useRef(dateOptions ? getInitialDateRange(dateOptions) : null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (formState && !!initialFormState.current) setFormState({ formState: initialFormState.current });
  }, [formSchema]);

  useEffect(() => {
    if (initialDateRange.current) {
      const { dateRange } = initialDateRange.current;
      const dateTimeRange = typeof dateRange === 'function' ? dateRange() : dateRange;
      if (setDateRange) setDateRange({ dateRange: dateTimeRange });
    }
  }, [dateOptions]);

  //
  const handleUpdateFilters = (formState: FormState) => {
    const { start_date, end_date } = dateRangeState;
    if (!start_date || !end_date) return;
    initialFormState.current = formState;
    onApplyFilters({ filters: formState, dateRange: { start_date, end_date } });
  };

  const handleFilterApply = (nextState?: FilterFormState) => {
    const _formState = nextState ? nextState.formState : formState;
    const _dateRange = nextState ? nextState.dateRange : dateRangeState;

    const { start_date, end_date } = _dateRange;
    if (!start_date || !end_date) return;
    initialFormState.current = _formState;
    onApplyFilters({
      dateRange: { start_date: new Date(start_date?.toString()), end_date: new Date(end_date) },
      filters: _formState,
    });
  };

  // Modal Methods
  const handleClearFilters = async () => {
    clearForm();
  };
  const handleCancel = () => {
    setFormState({ formState: initialFormState.current || {} });
    setModalIsOpen(false);
  };

  // Chip Container Methods
  const handleRemoveFilterChip = async ({ parentID, itemID }: { parentID: string; itemID: string }) => {
    const nextState = (await removeItem({ parentID, itemID })) as FilterFormState;
    handleFilterApply(nextState);
  };
  const handleClearFilterChips = async () => {
    const nextState = (await clearForm()) as FilterFormState;
    handleFilterApply(nextState);
  };

  // Date Range Methods
  const handleOnDateChange = (dateRange: DateRange) => {
    setDateRange({ dateRange });
  };

  const handleUpdateTimePeriod = ({ start_date, end_date }: DateRange) => {
    onApplyFilters({
      dateRange: { start_date, end_date },
      filters: formState,
    });
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DateRangeSelector
          isLoading={isLoading}
          dateOptions={dateOptions}
          onUpdateTimePeriod={handleUpdateTimePeriod}
          onChange={handleOnDateChange}
          value={dateRangeState}
          minDate={new Date('1/1/2020')} // as per design requirements
          maxEndDate={new Date()}
        />
        <Button
          variant="outlined"
          onClick={() => setModalIsOpen(true)}
          endIcon={<FilterAltOutlined />}
          sx={{ fontSize: '0.688rem', letterSpacing: '0.15px', minWidth: '3.125rem', height: '2.188rem' }}
        >
          FILTER
        </Button>
      </Box>
      <FilterForm
        isLoading={isLoading}
        title="Apply Filters"
        open={modalIsOpen}
        filterSchema={formSchema}
        formState={formState}
        onClose={() => {
          setModalIsOpen(false);
        }}
        onApplyFilters={handleUpdateFilters}
        onClearFilters={handleClearFilters}
        onCancel={handleCancel}
        onChange={(formState: FormState) => {
          onChange && onChange({ filters: formState, dateRange: dateRangeState });
        }}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onAddGroupItems={addGroupItems}
        onClearGroup={clearGroup}
      />

      <ChipContainer
        title="Filters Applied"
        selectedFilters={formState || {}}
        onDelete={handleRemoveFilterChip}
        variant="inline"
        onClearAll={handleClearFilterChips}
        openModal={() => setModalIsOpen(true)}
      />
    </Box>
  );
};
