import { useState } from 'react';

import {
  handleAddFormStateItem,
  handleAddFormStateItems,
  handleRemoveFormStateGroup,
  handleRemoveFormStateItem,
} from '@lths/shared/ui-filters';
import { FilterFormState, FormSchema, FormState, FormStateValue } from '@lths/types/ui-filters';

import { FormChildren } from './index';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof FormChildren> = {
  component: FormChildren,
  title: 'Inputs/Forms/ Form Children',
};

export default Story;

const Template: ComponentStory<typeof FormChildren> = (args) => {
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
    <FormChildren
      {...args}
      formState={formState}
      onAddGroupItems={handleAddGroupItems}
      onAddItem={handleAddItem}
      onClearGroup={handleClearGroup}
      onRemoveItem={handleRemoveItem}
    />
  );
};
const formSchema: FormSchema = {
  type: 'checkbox',
  title: null,
  seq: [-10, 100],
  default_value: ['pre_game'],
  data: [
    {
      title: 'Pre-game',
      id: 'pre_game',
      seq: [1, 100],
    },
    {
      title: 'Event day',
      id: 'event_day',
      seq: [2, 100],
    },
    {
      title: 'During the Event',
      id: 'during_event',
      seq: [3, 100],
    },
    {
      title: 'Post event',
      id: 'post_event',
      seq: [4, 100],
    },
    {
      title: 'No Event',
      id: 'no_event',
      seq: [5, 100],
    },
  ],
};

const formState = {
  event_state: {
    pre_game: {
      title: 'Pre-game',
      id: 'pre_game',
    },
  },
};

export const Primary = Template.bind({});
Primary.args = {
  formState,
  formSchema,
  groupTitle: 'Event States',
  groupID: 'event_state',
  isLoading: false,
  orientation: 'vertical',
};

export const Loading = Template.bind({});
Loading.args = {
  formState,
  formSchema,
  groupTitle: 'Event States',
  groupID: 'event_state',
  isLoading: true,
  orientation: 'vertical',
};
