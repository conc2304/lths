import { Box } from '@mui/material';

import SocialIconButtonComponent from './index';
import { MOBILE_SCREEN_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import mockComponent from '../../../../context/mock-data';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof SocialIconButtonComponent> = {
  component: SocialIconButtonComponent,
  title: 'core/Components/social-icon-button/Component',
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
const Template: StoryFn<typeof SocialIconButtonComponent> = (args) => (
  <SocialIconButtonComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.QuicklinkButtonGroup,
  data: {
    sub_component_data: [
      {
        icon: 'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/Twitter_Icon.svg',
        action: {
          type: 'web',
          page_id: '',
          page_link: 'https://twitter.com/AnaheimDucks',
        },
      },
      {
        icon: 'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/Facebook_Icon.svg',
        action: {
          type: 'web',
          page_id: '',
          page_link: 'https://www.facebook.com/anaheimducks%22',
        },
      },
      {
        icon: 'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/Instagram_Icon.svg',
        action: {
          type: 'web',
          page_id: '',
          page_link: 'https://www.instagram.com/anaheimducks%22',
        },
      },
      {
        icon: 'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/Tiktok_Icon.svg',
        action: {
          type: 'web',
          page_id: '',
          page_link: 'https://www.tiktok.com/@anaheimducks%22',
        },
      },
    ],
  },
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
