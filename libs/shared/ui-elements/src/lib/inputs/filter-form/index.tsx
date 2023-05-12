import { Dialog, DialogContent, DialogActions, Divider, useTheme, useMediaQuery, Box } from '@mui/material';
import Button from '@mui/material/Button';

import {
  AddGroupItems,
  AddItem,
  ClearGroup,
  FilterFormState,
  FormSchema,
  FormState,
  RemoveItem,
} from '@lths/types/ui-filters';

import { FormTitle } from './form-title';
import { ChipContainer } from '../chip-container';
import { Form } from '../form-builder';

export interface FilterFormProps {
  title: string;
  chipTitle?: string;
  open: boolean;
  filterSchema: FormSchema[];
  onApplyFilters: (formData: FormState) => void;
  onChange: (formData: FormState) => void;
  onClose: () => void;
  onClearFilters: () => void;
  onCancel: () => void;
  formState: FormState;
  onRemoveItem: RemoveItem;
  onAddItem: AddItem;
  onAddGroupItems: AddGroupItems;
  onClearGroup: ClearGroup;
}

export const FilterForm = ({
  title = 'Apply Filters',
  chipTitle = 'Selected Filters',
  filterSchema,
  onClose,
  onApplyFilters,
  onChange,
  onClearFilters,
  onCancel,
  formState,
  onRemoveItem,
  onAddItem,
  onAddGroupItems,
  onClearGroup,
  open,
}: FilterFormProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOnApplyFilters = () => {
    onApplyFilters(formState);
    onClose();
  };

  const handleChipDelete: RemoveItem = async ({ parentID, itemID }) => {
    const nextState = (await onRemoveItem({ parentID, itemID })) as FilterFormState;
    if (nextState) onChange(nextState?.formState || formState);
  };

  const handleAddFormItem: AddItem = (value) => {
    const nextState = onAddItem(value);
    if (nextState) onChange(nextState?.formState || formState);
  };

  const handleAddGroupItems: AddGroupItems = (value) => {
    const nextState = onAddGroupItems(value);
    if (nextState) onChange(nextState?.formState || formState);
  };

  const handleRemoveItem: RemoveItem = async (value) => {
    const nextState = (await onRemoveItem(value)) as FilterFormState;
    if (nextState) onChange(nextState?.formState || formState);
  };

  const handleClearGroup: ClearGroup = (value) => {
    const nextState = onClearGroup(value);
    if (nextState) onChange(nextState?.formState || formState);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="filter-dialog-title"
      className="FilterForm--Dailog"
      maxWidth="md"
      fullWidth={true}
      fullScreen={fullScreen}
    >
      <Box px="2.675rem" pt="2.125rem">
        <Box>
          <FormTitle id="filter-dialog-title" onClose={onCancel}>
            {title}
          </FormTitle>
        </Box>
        <DialogContent>
          <Form
            formSchema={filterSchema}
            formState={formState}
            onAddItem={handleAddFormItem}
            onAddGroupItems={handleAddGroupItems}
            onRemoveItem={handleRemoveItem}
            onClearGroup={handleClearGroup}
          />
          <Box mt={7}>
            <ChipContainer variant="modal" title={chipTitle} onDelete={handleChipDelete} selectedFilters={formState} />
          </Box>
        </DialogContent>
        <Divider variant="middle" sx={{ mt: 3 }} />
        <DialogActions sx={{ m: 3 }}>
          <Button
            variant="text"
            color="secondaryButton"
            onClick={onClearFilters}
            sx={{ fontSize: '0.75rem', mr: 1.75 }}
          >
            CLEAR ALL FILTERS
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={onCancel}
            // onClick={onCancel}
            sx={{ mr: 0.75 }}
          >
            CANCEL
          </Button>
          <Button variant="contained" color="primary" onClick={handleOnApplyFilters}>
            APPLY FILTERS
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
