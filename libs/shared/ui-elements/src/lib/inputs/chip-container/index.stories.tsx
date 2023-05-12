import { useState } from 'react';
import produce from 'immer';

import { FormState } from '@lths/types/ui-filters';

import { ChipContainer } from './index';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof ChipContainer> = {
  component: ChipContainer,
  title: 'Inputs/ Chip Container',
};
export default Story;

const initialFilters = {
  group1: {
    item1: { id: 'item1', title: 'Item 1' },
    item2: { id: 'item2', title: 'Item 2' },
  },
  group2: {
    item3: { id: 'item3', title: 'Item 3' },
  },
};

const Template: ComponentStory<typeof ChipContainer> = (args) => {
  const [selectedFilters, setSelectedFilters] = useState<FormState>(initialFilters);

  const handleDelete = ({ parentID, itemID }: { parentID: string; itemID: string }) => {
    const newState = produce(selectedFilters, (draft: FormState) => {
      if (!draft[parentID]) return selectedFilters;
      delete draft[parentID][itemID];
      if (!Object.keys(draft[parentID]).length) delete draft[parentID];
    });

    setSelectedFilters(newState);
  };

  return (
    <ChipContainer
      {...args}
      selectedFilters={selectedFilters}
      onClearAll={() => {
        setSelectedFilters({});
      }}
      onDelete={({ parentID, itemID }) => {
        handleDelete({ parentID, itemID });
      }}
      openModal={() => alert('Open Modal Triggered')}
    />
  );
};

export const Modal = Template.bind({});
Modal.args = {
  title: 'Filters Applied',
  variant: 'modal',
};

export const Inline = Template.bind({});
Inline.args = {
  title: 'Filters Applied',
  variant: 'inline',
};
