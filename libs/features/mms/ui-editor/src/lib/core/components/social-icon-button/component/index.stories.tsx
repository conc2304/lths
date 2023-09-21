import { Box } from '@mui/material';

import SocialIconButtonComponent from './index';
import mockComponent from '../../../../context/mock-data';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof SocialIconButtonComponent> = {
  component: SocialIconButtonComponent,
  title: 'core/Components/social-icon-button/Component',
};
export default Story;
const Template: StoryFn<typeof SocialIconButtonComponent> = (args) => (
  <Box
    sx={{
      backgroundColor: 'rgb(245, 245, 245)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{ width: '375px', backgroundColor: 'white' }}>
      <SocialIconButtonComponent {...args} />
    </Box>
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.QuicklinkButtonGroup,
  properties_data: {
    sub_properties_data: [
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
