import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

import { FilterForm } from './index';
import { formSchemaMock, formStateMock } from './mockData';
import {
  handleAddFormStateItem,
  handleAddFormStateItems,
  handleRemoveFormStateGroup,
  handleRemoveFormStateItem,
  FilterFormState,
  FormState,
  FormStateValue,
} from '../../ui-filters';

const Story: Meta<typeof FilterForm> = {
  component: FilterForm,
  title: 'Inputs/Forms/ Filter Form',
};

export default Story;

const Template: StoryFn<typeof FilterForm> = (args) => {
  const initialFormState = useRef(args.formState);
  const [modalIsOpen, setModalIsOpen] = useState(args.open);
  const [formState, setFormState] = useState(args.formState);
  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleAddItem = ({ parentID, item }: { parentID: string; item: FormStateValue }) => {
    if (!formState) return;
    const newState = handleAddFormStateItem(formState, { parentID, item });
    setFormState(newState);
  };

  const handleAddGroupItems = ({ parentID, items }: { parentID: string; items: FormStateValue }) => {
    if (!formState) return;
    const newState = handleAddFormStateItems(formState, { parentID, items });
    setFormState(newState);
  };

  const handleClearGroup = ({ parentID }: { parentID: string }) => {
    if (!formState) return;

    const newState = handleRemoveFormStateGroup(formState, { parentID });
    setFormState(newState);
  };

  const handleRemoveItem = ({ parentID, itemID }: { parentID: string; itemID: string }) => {
    if (!formState) return Promise.resolve({} as FilterFormState);

    const nextState = handleRemoveFormStateItem(formState, { parentID, itemID });
    setFormState(nextState);
    return Promise.resolve({
      formState: nextState,
    } as FilterFormState);
  };

  const handleCancel = () => {
    setFormState(initialFormState.current);
    setModalIsOpen(false);
  };

  const handleUpdateFilters = (formState: FormState) => {
    initialFormState.current = formState;
    setFormState(initialFormState.current);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        OPEN
      </Button>
      <FilterForm
        {...args}
        formState={formState}
        open={modalIsOpen}
        onClose={handleClose}
        onApplyFilters={handleUpdateFilters}
        onClearFilters={() => setFormState({})}
        onAddItem={handleAddItem}
        onAddGroupItems={handleAddGroupItems}
        onRemoveItem={handleRemoveItem}
        onClearGroup={handleClearGroup}
        onCancel={handleCancel}
      />
    </>
  );
};

const mockFilterSchema = formSchemaMock;
const mockFormState = formStateMock;

export const Default = Template.bind({});
Default.args = {
  title: 'Apply Filters',
  chipTitle: 'Selected Filters',
  filterSchema: mockFilterSchema,
  formState: mockFormState,
  open: true,
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
