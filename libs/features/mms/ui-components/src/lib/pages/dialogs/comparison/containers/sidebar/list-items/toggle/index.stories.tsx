import { List } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';

import ToggleListItem from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ToggleListItem> = {
  component: ToggleListItem,
  title: 'ui-components / Containers / Pages / Dialogs / Comparison / Toggle List Item',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <List>
          <Story />
        </List>
      </MemoryRouter>
    ),
  ],
};
export default Story;

const Template: StoryFn<typeof ToggleListItem> = (args) => (
  <ToggleListItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  text: "Page Name",
  page_id: "home_page",
  isDefault: false,
  disabled: false,
  checked: false,
  onToggle: () => ({}),
}

Primary.argTypes = {
  text: { control: 'text' },
  page_id: { control: 'text' },
  isDefault: { control: 'boolean' },
  disabled: { control: 'boolean' },
  checked: { control: 'boolean' },
}