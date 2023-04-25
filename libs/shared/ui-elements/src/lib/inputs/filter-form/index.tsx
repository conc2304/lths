import { Dialog, DialogContent, DialogActions, Divider, useTheme, useMediaQuery, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { FormSchema, FormState } from '@lths/shared/ui-filters';

import { FormTitle } from './form-title';
import { ChipContainer } from '../chip-container';
import { Form } from '../form-builder';

export type FilterFormProps = {
  title: string;
  chipTitle?: string;
  open: boolean;
  filterSchema: FormSchema[];
  handleApplyFilters: (formData: FormState) => void;
  handleClose: () => void;
  handleClearFilters: () => void;
  handleCancel: () => void;
  formState: FormState;
  removeItem: (parentID: string, itemID: string) => void;
};

export const FilterForm = ({
  title = 'Apply Filters',
  chipTitle = 'Selected Filters',
  filterSchema,
  handleClose,
  handleApplyFilters,
  handleClearFilters,
  handleCancel,
  formState,
  removeItem,
  open,
}: FilterFormProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOnApplyFilters = () => {
    handleApplyFilters(formState);
    handleClose();
  };

  const handleChipDelete: typeof removeItem = (parentID, itemID) => {
    removeItem && removeItem(parentID, itemID);
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
          <FormTitle id="filter-dialog-title" onClose={handleCancel}>
            {title}
          </FormTitle>
        </Box>
        <DialogContent>
          <Form formSchema={filterSchema} />
          <Box mt={7}>
            <ChipContainer title={chipTitle} onDelete={handleChipDelete} selectedFilters={formState} />
          </Box>
        </DialogContent>
        <Divider variant="middle" sx={{ mt: 3 }} />
        <DialogActions sx={{ m: 3 }}>
          <Button
            variant="text"
            color="secondaryButton"
            onClick={handleClearFilters}
            sx={{ fontSize: '0.75rem', mr: 1.75 }}
          >
            CLEAR ALL FILTERS
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCancel} sx={{ mr: 0.75 }}>
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
