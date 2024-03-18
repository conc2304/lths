import { Box } from '@mui/material';

import QuicklinkButtonGroupComponent from './index';
import { MOBILE_SCREEN_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof QuicklinkButtonGroupComponent> = {
  component: QuicklinkButtonGroupComponent,
  title: 'core/ Components/ quicklink-button-group / Component',
  parameters: {
    backgrounds: {
      default: 'editor',
      values: [
        { name: 'editor', value: colors.editor.background },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <Box sx={{ width: MOBILE_SCREEN_WIDTH, backgroundColor: colors.editor.mobile.background }}>
          <Story />
        </Box>
      </Box>
    ),
  ],
};
export default Story;

const Template: StoryFn<typeof QuicklinkButtonGroupComponent> = (args) => (
  <QuicklinkButtonGroupComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    ...mockComponentProps,
    __ui_id__ : "3333333",
    component_id: Component.QuicklinkButtonGroup,
    data: {    
      sub_component_data: [
        {
          card_background_color: "",
          icon: "nonexistent png",
          text_color: "",
          title: "LABEL",
          action: {
            type: '',
            page_id: 'medical page',
            page_link: 'first aid link',
          },
        },
        {
          card_background_color: "",
          icon: "nonexistent png 2",
          text_color: "",
          title: "LABEL2",
          action: {
            type: '',
            page_id: 'report crime',
            page_link: 'local police department link',
          },
        }
      ],
    }
}

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
