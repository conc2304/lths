import { Box } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';

import PreviewHeader from './index';
import { mockPageDetailtProps } from '../../mock-data';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof PreviewHeader> = {
  component: PreviewHeader,
  title: 'ui-components / Containers / Pages / Dialogs / Comparison / Preview Header',
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Box sx={{ width: '375px' }}>
          <Story />
        </Box>
      </MemoryRouter>
    ),
  ],
};
export default Story;

const Template: StoryFn<typeof PreviewHeader> = (args) => (
  <PreviewHeader {...args} />
);

export const Primary = Template.bind({});
export const HideConstraints = Template.bind({});
export const Variant = Template.bind({});

// set args
Primary.args = {
  page: {
    ...mockPageDetailtProps,
    _id: "unique_id",
    page_id: "home_page",
    components: [], 
    name: "Page Name",
    is_variant: false,
    constraints: { _id: "", events: [], locations: [], user_segments: [] },
    constraints_formatted: "specific events and states, at arena, out of arena, mighty members",
  },
  showConstraints: true,
}
HideConstraints.args = {
  ...Primary.args,
  showConstraints: false,
}
Variant.args = {
  ...Primary.args,
  page: {
    ...mockPageDetailtProps,
    ...Primary.args.page,
    is_variant: true,
  }
}

// set argTypes
Primary.argTypes = {
  showConstraints: { control: 'boolean' },
}
HideConstraints.argTypes = Primary.argTypes;
Variant.argTypes = Primary.argTypes;