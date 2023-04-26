import { useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';
import { ChipContainer, ConnectedFilterForm, DateRangeSelector } from '@lths/shared/ui-elements';

import { FormSchema, FormState, useFilterFormState } from '../../context';
import { getInitialFormState } from '../utils';
import { DateFilterOption, DateRange } from 'libs/shared/ui-elements/src/lib/inputs/date-range-selector/types';

interface UiFiltersProps {
  formSchema: FormSchema[];
  handleApplyFilter: (appliedFilters: FormState) => void;
  dateOptions: DateFilterOption;
}

export const UiFilters = (props: UiFiltersProps): JSX.Element => {
  const { formSchema, handleApplyFilter, dateOptions } = props;
  const { setModalIsOpen, modalIsOpen, setFormState, clearForm, formState, removeItem } = useFilterFormState();
  const initialFormState = useRef(getInitialFormState(formSchema));

  useEffect(() => {
    setFormState && setFormState(initialFormState.current);
  }, [formSchema]);

  const handleClearFilters = () => {
    clearForm && clearForm();
  };

  const handleRemoveItem = (parentID: string, itemID: string) => {
    !!removeItem && removeItem(parentID, itemID);
  };

  const handleFilterApply = () => {
    initialFormState.current = formState;
    handleApplyFilter(formState);
  };

  const handleSetModal = (isOpen: boolean) => {
    setModalIsOpen && setModalIsOpen(isOpen);
  };

  const handleCancel = () => {
    setFormState && setFormState(initialFormState.current);
    setModalIsOpen && setModalIsOpen(false);
  };

  const handleRemoveInlineFilter = (parentID: string, itemID: string) => {
    !!removeItem && removeItem(parentID, itemID);
    handleFilterApply();
  };

  const handleClearInLineFilters = () => {
    handleClearFilters();
    handleApplyFilter(formState);
  };

  const handleUpdateDateRange = ({ start, end }: DateRange) => {};

  return (
    <Box sx={{ flex: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DateRangeSelector
          dateOptions={dateOptions}
          onUpdateRange={handleUpdateDateRange}
          onChange={({ start, end }) => {
            handleFilterApply();
          }}
        />
        <Button
          variant="outlined"
          onClick={() => handleSetModal(true)}
          endIcon={<FilterAltOutlined />}
          sx={{ fontSize: '0.688rem', letterSpacing: '0.15px', minWidth: '3.125rem', height: '2.188rem' }}
        >
          FILTER
        </Button>
      </Box>
      <ConnectedFilterForm
        title="Apply Filters"
        open={modalIsOpen}
        filterSchema={formSchema}
        handleClose={() => handleSetModal(false)}
        handleApplyFilters={handleFilterApply}
        handleClearFilters={handleClearFilters}
        handleCancel={handleCancel}
        formState={formState}
        removeItem={handleRemoveItem}
      />
      <ChipContainer
        title="Filters Applied"
        selectedFilters={formState}
        onDelete={handleRemoveInlineFilter}
        variant="inline"
        onClearAll={handleClearInLineFilters}
        openModal={() => handleSetModal(true)}
      />
    </Box>
  );
};
