import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Form } from './index';
import { FilterFormState, FormState, FormStateValue } from '../../ui-filters/types';
import {
  handleAddFormStateItem,
  handleAddFormStateItems,
  handleRemoveFormStateGroup,
  handleRemoveFormStateItem,
} from '../../ui-filters/utils/actions';
import { formSchemaMock, formStateMock } from '../filter-form/mockData';

const Story: Meta<typeof Form> = {
  component: Form,
  title: 'Inputs/Forms/ Form Generator',
};
export default Story;

const Template: StoryFn<typeof Form> = (args) => {
  const [formState, setFormState] = useState<FormState | undefined>(args.formState);

  const handleonAddItem = ({ parentID, item }: { parentID: string; item: FormStateValue }) => {
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
    if (!formState) return Promise.reject({} as FilterFormState);

    const nextState = handleRemoveFormStateItem(formState, { parentID, itemID });
    setFormState(nextState);
    return Promise.resolve({
      formState: nextState,
    } as FilterFormState);
  };

  return (
    <Form
      {...args}
      formState={formState}
      onAddGroupItems={handleAddGroupItems}
      onAddItem={handleonAddItem}
      onClearGroup={handleClearGroup}
      onRemoveItem={handleRemoveItem}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  formSchema: formSchemaMock,
  formState: formStateMock,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
