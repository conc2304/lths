import { useState } from 'react';
import produce from 'immer';

import { FilterFormState, FormSchema, FormState, FormStateValue } from '@lths/types/ui-filters';

import { FormChildren } from './index';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof FormChildren> = {
  component: FormChildren,
  title: 'Inputs/Forms/ Form Children',
};

export default Story;

const Template: ComponentStory<typeof FormChildren> = (args) => {
  const [formState, setFormState] = useState<FormState>(args.formState);

  const handleonAddItem = ({ parentID, item }: { parentID: string; item: FormStateValue }) => {
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
  const handleonClearGroup = ({ parentID }: { parentID: string }) => {
    const newState = produce(formState, (draft) => {
      delete draft[parentID];
    });
    setFormState(newState);
  };
  const handleonRemoveItem = ({ parentID, itemID }: { parentID: string; itemID: string }) => {
    const nextState = produce(formState, (draft) => {
      if (!draft[parentID]) return formState;
      delete draft[parentID][itemID];
      if (!Object.keys(draft[parentID]).length) delete draft[parentID];
    });
    setFormState(nextState);
    return Promise.resolve({} as FilterFormState);
  };

  return (
    <FormChildren
      {...args}
      formState={formState}
      onAddGroupItems={handleAddGroupItems}
      onAddItem={handleonAddItem}
      onClearGroup={handleonClearGroup}
      onRemoveItem={handleonRemoveItem}
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
};
