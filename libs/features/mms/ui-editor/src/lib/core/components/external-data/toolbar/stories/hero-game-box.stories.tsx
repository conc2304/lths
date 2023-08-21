import ExternalDataToolbar from '../index';
import { EditorProvider, ComponentProps } from '../../../../../context';
import { PageDetail } from '@lths/features/mms/data-access';
import ToolbarStory from '../../../toolbar-story';
import mockComponent from '../../../../../context/mockdata';
import { Component } from '../../../enum';
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

const Story: Meta<typeof ExternalDataToolbar> = {
  component: ExternalDataToolbar,
  title: 'core/ Components/ live data/ hero-game-box / Toolbar',
};
export default Story;

const Template: StoryFn<ComponentProps> = (args) => (
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
    component_id: Component.HeroGameBox,
    properties_data: {    
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