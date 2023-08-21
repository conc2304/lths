import HeroPromotionCardTextToolbar from './index';
import { EditorProvider } from '../../../../../context';
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

const Story: Meta<typeof HeroPromotionCardTextToolbar> = {
  component: HeroPromotionCardTextToolbar,
  title: 'core/ Components/ hero-promotion-card-text / Toolbar',
};
export default Story;

const Template: StoryFn<typeof HeroPromotionCardTextToolbar> = (args) => (
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
    component_id: Component.HeroPromotionCardText,
    properties_data: {    
      sub_properties_data: [
        {
            name: 'Carousel Name 1',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-1.png',
            img_alt_text: "ImageAlt1",
            title: 'A Title 1',
            action: { type: '', page_id: 'pageId1', page_link: 'pageLink1', },
        },
        {
            name: 'Carousel Name 2',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-2.png',
            img_alt_text: "ImageAlt2",
            title: 'A Title 2',
            action: { type: '', page_id: 'pageId2', page_link: 'pageLink2', },
        },
        {
            name: 'Carousel Name 3',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-3.png',
            img_alt_text: "ImageAlt3",
            title: 'A Title 3',
            action: { type: '', page_id: 'pageId3', page_link: 'pageLink3', },
        },
        {
            name: 'Carousel Name 4',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-4.png',
            img_alt_text: "ImageAlt4",
            title: 'A Title 4',
            action: { type: '', page_id: 'pageId4', page_link: 'pageLink4', },
        },
      ],
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