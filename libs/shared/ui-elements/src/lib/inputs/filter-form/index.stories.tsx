import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import produce from 'immer';

import { FilterFormState, FormState, FormStateValue } from '@lths/types/ui-filters';

import { FilterForm } from './index';
import { formSchemaMock, formStateMock } from './mockData';

const Story: ComponentMeta<typeof FilterForm> = {
  component: FilterForm,
  title: 'Inputs/Forms/ Filter Form',
};

export default Story;

const Template: ComponentStory<typeof FilterForm> = (args) => {
  const initialFormState = useRef(args.formState);
  const [modalIsOpen, setModalIsOpen] = useState(args.open);
  const [formState, setFormState] = useState(args.formState);
  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleAddItem = ({ parentID, item }: { parentID: string; item: FormStateValue }) => {
    const newState = produce(formState, (draft) => {
      if (!draft[parentID]) {
        draft[parentID] = item;
      } else {
        draft[parentID] = {
          ...formState[parentID],
          ...item,
        };
      }
    });
    setFormState(newState);
  };

  const handleAddGroupItems = ({ parentID, items }: { parentID: string; items: FormStateValue }) => {
    const newState = produce(formState, (draft) => {
      draft[parentID] = {
        ...formState[parentID],
        ...items,
      };
    });

    setFormState(newState);
  };
  const handleClearGroup = ({ parentID }: { parentID: string }) => {
    const newState = produce(formState, (draft) => {
      delete draft[parentID];
    });
    setFormState(newState);
  };
  const handleRemoveItem = ({ parentID, itemID }: { parentID: string; itemID: string }) => {
    const nextState = produce(formState, (draft) => {
      if (!draft[parentID]) return formState;
      delete draft[parentID][itemID];
      if (!Object.keys(draft[parentID]).length) delete draft[parentID];
    });
    setFormState(nextState);
    return Promise.resolve({} as FilterFormState);
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
        title={args.title}
        chipTitle={args.chipTitle}
        filterSchema={args.filterSchema}
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
        onChange={args.onChange}
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
};
