import QuicklinkButtonGroupToolbar from './index';
import colors from '../../../../common/colors';
import { EditorProvider, ToolbarContextProvider } from '../../../../context';
import mockComponent from '../../../../context/mock-data';
import { AutocompleteOptionProps } from '../../../../elements';
import { Component } from '../../enum';
import { QuicklinkButtonGroupComponentProps } from '../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof QuicklinkButtonGroupToolbar> = {
  component: QuicklinkButtonGroupToolbar,
  title: 'core/ Components/ quicklink-button-group / Toolbar',
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

type StoryArgs = QuicklinkButtonGroupComponentProps & {
  mock_quickLinkIcons: AutocompleteOptionProps[];
};

const Template: StoryFn<StoryArgs> = (args) => {
  function mockOnPropChange(propName, callback) {
    if (propName === 'quickLinkIcons') {
      callback(args.mock_quickLinkIcons);
    }
  }

  return (
    <QuicklinkButtonGroupToolbar {...args} onPropChange={mockOnPropChange} />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.QuicklinkButtonGroup,
  data: {
    sub_component_data: [
      {
        card_background_color: '',
        icon: 'nonexistent png',
        text_color: '',
        title: 'LABEL',
        action: {
          type: 'native',
          page_id: 'medical page',
          page_link: 'first aid link',
        },
      },
      {
        card_background_color: '',
        icon: 'nonexistent png 2',
        text_color: '',
        title: 'LABEL2',
        action: {
          type: 'web',
          page_id: 'report crime',
          page_link: 'local police department link',
        },
      },
    ],
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
