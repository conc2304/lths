import { useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';
import { ChipContainer, ConnectedFilterForm } from '@lths/shared/ui-elements';

import { FormSchema, FormState, useFilterFormState } from '../../context';
import { getInitialFormState } from '../utils';

interface UiFiltersProps {
  formSchema: FormSchema[];
  handleApplyFilter: (appliedFilters: FormState) => void;
}

export const UiFilters = (props: UiFiltersProps): JSX.Element => {
  const { formSchema, handleApplyFilter } = props;
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

  return (
    <Box>
      <Box>
        {/* TODO - Date Picker To Go Here */}
        <Button variant="outlined" onClick={() => handleSetModal(true)} endIcon={<FilterAltOutlined />}>
          Filters
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
