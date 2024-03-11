import HalfWidthTextToolbar from './index';
import colors from '../../../../common/colors';
import { EditorProvider, ToolbarContextProvider } from '../../../../context';
import mockComponent from '../../../../context/mock-data';
import { AutocompleteOptionProps } from '../../../../elements';
import { Component } from '../../enum';
import { HalfWidthTextComponentProps } from '../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HalfWidthTextToolbar> = {
  component: HalfWidthTextToolbar,
  title: 'core/ Components/ half-width-text-component / Toolbar',
  parameters: {
    backgrounds: {
      default: 'sidebar',
      values: [
        { name: 'sidebar', value: colors.sidebar.background },
      ],
    },
  },
  decorators: [
    (Story) => (
      <EditorProvider initialValue={{components: []}}>
        <ToolbarContextProvider initialValue={{}}>
          <Story />
        </ToolbarContextProvider>
      </EditorProvider>
    ),
  ],
};
export default Story;

type StoryArgs = HalfWidthTextComponentProps & {
  mock_quickLinkIcons: AutocompleteOptionProps[];
};

const Template: StoryFn<StoryArgs> = (args) => {
  function mockOnPropChange(propName, callback) {
    if (propName === 'quickLinkIcons') {
      callback(args.mock_quickLinkIcons);
    }
  }

  return (<HalfWidthTextToolbar {...args} onPropChange={mockOnPropChange} />);
};

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.HalfWidthText,
  data: {
    btn_text: 'Map',
    description: 'Test description pizza tastes good',
    icon: 'icon url',
    image: 'iamge url',
    section: 'Section 206',
    sub_title: 'Pizza, Drinks',
    text_color: 'string',
    title: 'Anaheim Pizza Co',
    action: {
      type: 'native',
      page_id: 'map page',
      page_link: 'maplink',
    },
  },
  mock_quickLinkIcons: [
    { label: 'iconOne', value: 'icon.one.link' },
    { label: 'iconTwo', value: 'icon.two.link' },
    { label: 'iconThree', value: 'icon.three.link' },
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
