import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { VerticalFormGroup } from './index';
import { FilterFormState, FormSchema, FormState, FormStateValue } from '../../ui-filters/types';
import {
  handleAddFormStateItem,
  handleAddFormStateItems,
  handleRemoveFormStateGroup,
  handleRemoveFormStateItem,
} from '../../ui-filters/utils/actions';
import { formSchemaMock, formStateMock } from '../filter-form/mockData';

const Story: Meta<typeof VerticalFormGroup> = {
  component: VerticalFormGroup,
  title: 'Inputs/Forms/ VerticalFormGroup',
};
export default Story;

const Template: StoryFn<typeof VerticalFormGroup> = (args) => {
  const [formState, setFormState] = useState<FormState | undefined>(args.formState);

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

  return (
    <VerticalFormGroup
      {...args}
      formSchema={args.isLoading ? undefined : args.formSchema}
      formState={formState}
      onAddGroupItems={handleAddGroupItems}
      onAddItem={handleAddItem}
      onClearGroup={handleClearGroup}
      onRemoveItem={handleRemoveItem}
    />
  );
};

const formSchema: FormSchema = formSchemaMock[0];

const formState: FormState = formStateMock;

export const Default = Template.bind({});
Default.args = {
  formSchema: formSchema,
  formState: formState,
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
