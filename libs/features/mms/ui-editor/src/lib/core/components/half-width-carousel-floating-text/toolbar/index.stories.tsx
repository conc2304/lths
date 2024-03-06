import HalfWidthCarouselFloatingTextToolbar from './index';
import colors from '../../../../common/colors';
import { EditorProvider, ToolbarContextProvider } from '../../../../context';
import mockComponent from '../../../../context/mock-data';
import { Component } from '../../enum';
import { HalfWidthCarouselFloatingTextComponentProps, PageAutocompleteItemProps } from '../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HalfWidthCarouselFloatingTextToolbar> = {
  component: HalfWidthCarouselFloatingTextToolbar,
  title: 'core/ Components/ half-width-carousel-floating-text / Toolbar',
  decorators: [
    (Story) => (
      <ToolbarContextProvider initialValue={{}}>
        <Story />
      </ToolbarContextProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'sidebar',
      values: [
        { name: 'sidebar', value: colors.sidebar.background },
      ],
    },
  },
};
export default Story;

type StoryArgs = HalfWidthCarouselFloatingTextComponentProps & {
  mock_action: PageAutocompleteItemProps[];
};

const Template: StoryFn<StoryArgs> = (args) => {
  const initialState = {
    components: [],
    selectedComponent: args,
  };

  function mockOnPropChange(propName, callback) {
    if (propName === 'action') {
      callback(args.mock_action);
    }
  }

  return (
    <EditorProvider initialValue={initialState}>
      <HalfWidthCarouselFloatingTextToolbar {...args} onPropChange={mockOnPropChange} />
    </EditorProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.HalfWidthCarouselFloatingText,
  data: {
    sub_component_data: [
      {
        name: 'Custom name 1',
        image: 'A.Image-1.png',
        img_alt_text: 'alt text 1',
        title: 'Title 1',
        action: { type: 'native', page_id: 'action.one.value', page_link: 'pageLink1' },
      },
      {
        name: 'Custom name 2',
        image: 'A.Image-2.png',
        img_alt_text: 'alt text 2',
        title: 'Title 2',
        action: { type: 'web', page_id: 'action.one.value', page_link: 'pageLink2' },
      },
      {
        name: 'Custom name 3',
        image: 'A.Image-3.png',
        img_alt_text: 'alt text 3',
        title: 'Title 3',
        action: { type: 'native', page_id: 'action.one.value', page_link: 'pageLink3' },
      },
      {
        name: 'Custom name 4',
        image: 'A.Image-4.png',
        img_alt_text: 'alt text 4',
        title: 'Title 4',
        action: { type: 'web', page_id: 'action.one.value', page_link: 'pageLink4' },
      },
    ],
  },
  mock_action: [
    { label: 'actionOne', value: 'action.one.value', type: '', static: false },
    { label: 'actionTwo', value: 'action.two.link', type: '', static: false },
    { label: 'actionThree', value: 'action.three.link', type: '', static: false },
  ],
};

Primary.argTypes = {
  __ui_id__: { table: { disable: true } },
  component_id: { table: { disable: true } },
  _id: { table: { disable: true } },
  name: { table: { disable: true } },
  description: { table: { disable: true } },
  category: { table: { disable: true } },
  image_url: { table: { disable: true } },
  display_order: { table: { disable: true } },
  variation_id: { table: { disable: true } },
  schema: { table: { disable: true } },
};
