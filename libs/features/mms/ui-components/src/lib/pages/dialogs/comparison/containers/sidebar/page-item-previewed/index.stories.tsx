import { MemoryRouter } from 'react-router-dom';

import PageItemPreviewed from './index';
import { mockPageDetailtProps } from '../../mock-data';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof PageItemPreviewed> = {
  component: PageItemPreviewed,
  title: 'ui-components / Containers / Pages / Dialogs / Comparison / Page Item Previewed',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default Story;

const Template: StoryFn<typeof PageItemPreviewed> = (args) => (
  <PageItemPreviewed {...args} />
);

export const Primary = Template.bind({});
export const NoDefaultPreview = Template.bind({});

// set args
Primary.args = {
  title: "A Title",
  pageItem: {
    page: {
        ...mockPageDetailtProps,
        _id: "unique_id",
        page_id: "home_page",
        components: [], 
        name: "Page Name",
        is_variant: false,
        constraints: { _id: "", events: [], locations: [], user_segments: [] },
    },
    isShow: false,
    isDisabled: false,
  },
  onShowToggle: () => ({}),
}
NoDefaultPreview.args = {
    ...Primary.args,
    pageItem: undefined,
}


Primary.argTypes = {
  title: { control: 'text' },
  pageItem: { control: 'object' },
}
NoDefaultPreview.argTypes = {
    ...Primary.argTypes,
    pageItem: { table: { disable: true }},
};