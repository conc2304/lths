import { List } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MemoryRouter } from 'react-router-dom';

import DraggableListItem from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof DraggableListItem> = {
  component: DraggableListItem,
  title: 'ui-components / Containers / Pages / Dialogs / Comparison / Draggable List Item',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <DndProvider backend={HTML5Backend}>
          <List>
            <Story />
          </List>
        </DndProvider>
      </MemoryRouter>
    ),
  ],
};
export default Story;

const Template: StoryFn<typeof DraggableListItem> = (args) => (
  <DraggableListItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  id: "unique_id",
  index: 1,
  text: "Page Name",
  page_id: "home_page",
  isDefault: false,
  disabled: false,
  checked: false,
  onDrag: () => ({}),
  onShowToggle: () => ({}),
}

Primary.argTypes = {
  id: { table: { disable: true }},
  index: { table: { disable: true }},
  text: { control: 'text' },
  page_id: { control: 'text' },
  isDefault: { control: 'boolean' },
  disabled: { control: 'boolean' },
  checked: { control: 'boolean' },
}