import { Box } from '@mui/material';

import { PageDetail } from '@lths/features/mms/data-access';

import SocialIconButtonToolbar from './index';
import { EditorProvider } from '../../../../context';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';
import ToolbarStory from '../../toolbar-story';

import type { Meta, StoryFn } from '@storybook/react';

const initialState: PageDetail = {
  _id: null,
  page_id: null,
  type: null,
  name: null,
  description: null,
  is_variant: null,
  status: null,
  components_schema: [],
  default_page_id: null,
  default_page_name: null,
  constraints: {
    _id: null,
    events: [],
    locations: [],
    user_segments: [],
  },
  components: [],
};

const Story: Meta<typeof SocialIconButtonToolbar> = {
  component: SocialIconButtonToolbar,
  title: 'core/Components/social-icon-button/Toolbar',
};
export default Story;

const Template: StoryFn<typeof SocialIconButtonToolbar> = (args) => (
  <EditorProvider<PageDetail> initialValue={initialState}>
    <Box sx={{ padding: '16px', backgroundColor: 'rgb(245, 245, 245)' }}>
      <ToolbarStory componentProps={args} />
    </Box>
  </EditorProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.SocialIconButton,
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
  properties_data: { table: { disable: true } },
};
