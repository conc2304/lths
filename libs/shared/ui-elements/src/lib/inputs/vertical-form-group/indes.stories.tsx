import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  handleAddFormStateItem,
  handleAddFormStateItems,
  handleRemoveFormStateGroup,
  handleRemoveFormStateItem,
} from '@lths/shared/ui-filters';
import { FilterFormState, FormSchema, FormState, FormStateValue } from '@lths/types/ui-filters';

import { VerticalFormGroup } from './index';
import { formSchemaMock, formStateMock } from '../filter-form/mockData';

const Story: ComponentMeta<typeof VerticalFormGroup> = {
  component: VerticalFormGroup,
  title: 'Inputs/Forms/ VerticalFormGroup',
};
export default Story;

const Template: ComponentStory<typeof VerticalFormGroup> = (args) => {
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
