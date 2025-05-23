import { MemoryRouter } from 'react-router-dom';

import PageListCompared from './index';
import { mockPageDetailtProps } from '../../mock-data';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof PageListCompared> = {
  component: PageListCompared,
  title: 'ui-components / Containers / Pages / Dialogs / Comparison / Page List Compared',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default Story;

const Template: StoryFn<typeof PageListCompared> = (args) => (
  <PageListCompared {...args} />
);

export const Primary = Template.bind({});
export const DisabledItems = Template.bind({});
export const NoItems = Template.bind({});

// set args
Primary.args = {
  title: "Page List",
  pageList: [
    {
      page: {
        ...mockPageDetailtProps,
        _id: "unique_id",
        page_id: "home_page",
        components: [], 
        name: "Page Name",
        is_variant: false,
        constraints: { _id: "", events: [], locations: [], user_segments: [] },
      },
      isShow: true,
      isDisabled: false,
    },
    {
      page: {
        ...mockPageDetailtProps,
        _id: "unique_id2",
        page_id: "home_page",
        components: [], 
        name: "Home Page Variant 1",
        is_variant: true,
        constraints: { _id: "", events: [], locations: [], user_segments: [] },
      },
      isShow: false,
      isDisabled: false,
    },
    {
      page: {
        ...mockPageDetailtProps,
        _id: "unique_id3",
        page_id: "home_page",
        components: [], 
        name: "Home Page Variant 2",
        is_variant: true,
        constraints: { _id: "", events: [], locations: [], user_segments: [] },
      },
      isShow: false,
      isDisabled: false,
    },
  ],
  onDrag: () => ({}),
  onShowToggle: () => ({}),
}
DisabledItems.args = {
  ...Primary.args,
  pageList: Primary.args.pageList && [
    ...(
      Primary.args.pageList.map((pageItem, index) => ({
        ...pageItem,
        isDisabled: (index % 2 === 0),
      }))
    )
  ]
}

NoItems.args = {
  ...Primary.args,
  title: "Page List",
  pageList:[],
}

// set argTypes
Primary.argTypes = {
  title: { control: 'text' },
  pageList: { control: 'object' },
}
DisabledItems.argTypes = Primary.argTypes;
NoItems.argTypes = Primary.argTypes;