import QuicklinkButtonGroupToolbar from './index';
import { EditorProvider } from '../../../../context';
import { PageDetail } from '@lths/features/mms/data-access';
import ToolbarStory from '../../toolbar-story';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';
import type { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';

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

const Story: Meta<typeof QuicklinkButtonGroupToolbar> = {
  component: QuicklinkButtonGroupToolbar,
  title: 'core/ Components/ quicklink-button-group / Toolbar',
};
export default Story;

const Template: StoryFn<typeof QuicklinkButtonGroupToolbar> = (args) => (
  <EditorProvider<PageDetail> initialValue={initialState}>
    <Box sx={{padding: '16px', backgroundColor: 'rgb(245, 245, 245)' }}>
        <ToolbarStory componentProps={args} />
    </Box>
  </EditorProvider>
);


export const Primary = Template.bind({});
Primary.args = {
    ...mockComponent,
    __ui_id__ : "3333333",
    component_id: Component.QuicklinkButtonGroup,
    properties_data: {    
      first_button: {
        label: "Medical Help",
        icon: "https://i.im.ge/2022/12/05/S82BeW.Group.png",
        action: {
          type: '',
          page_id: 'medical page',
          page_link: 'first aid link',
        },
      },
      second_button: {
        label: "Report",
        icon: "https://i.im.ge/2022/12/05/S824gr.Group.png",
        action: {
          type: '',
          page_id: 'report crime',
          page_link: 'local police department link',
        },
      },
    }
}

Primary.argTypes = {
    __ui_id__: { table: { disable: true}},
    component_id: { table: { disable: true}},
    _id: { table: { disable: true}},
    name: { table: { disable: true}},
    description: { table: { disable: true}},
    category: { table: { disable: true}},
    image_url: { table: { disable: true}},
    display_order: { table: { disable: true}},
    variation_id: { table: { disable: true}},
    schema: { table: { disable: true}},
    properties_data: { table: { disable: true}},
}