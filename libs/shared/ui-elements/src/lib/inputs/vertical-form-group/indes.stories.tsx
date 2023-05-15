import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import produce from 'immer';

import { FilterFormState, FormSchema, FormState, FormStateValue } from '@lths/types/ui-filters';

import { VerticalFormGroup } from './index';
import { formSchemaMock, formStateMock } from '../filter-form/mockData';

const Story: ComponentMeta<typeof VerticalFormGroup> = {
  component: VerticalFormGroup,
  title: 'Inputs/Forms/ VerticalFormGroup',
};
export default Story;

const Template: ComponentStory<typeof VerticalFormGroup> = (args) => {
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
    <VerticalFormGroup
      {...args}
      formState={formState}
      onAddGroupItems={handleAddGroupItems}
      onAddItem={handleonAddItem}
      onClearGroup={handleonClearGroup}
      onRemoveItem={handleonRemoveItem}
    />
  );
};

const formSchema: FormSchema = formSchemaMock[0];

const formState: FormState = formStateMock;

export const Default = Template.bind({});
Default.args = {
  formSchema: formSchema,
  formState: formState,
};
