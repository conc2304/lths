import PromotionOneIsToOneAspectRatioComponent from './index';
import type { Meta, StoryFn } from '@storybook/react';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';
import { Box } from '@mui/material';

const Story: Meta<typeof PromotionOneIsToOneAspectRatioComponent> = {
  component: PromotionOneIsToOneAspectRatioComponent,
  title: 'core/ Components/ promotion-one-is-to-one-aspect-ratio / Component',
};
export default Story;

const Template: StoryFn<typeof PromotionOneIsToOneAspectRatioComponent> = (args) => (
    <Box 
        sx={{
            backgroundColor: 'rgb(245, 245, 245)',
            display: 'flex', justifyContent: 'center',
            alignItems: 'center' 
        }}
    >
        <Box sx={{ width: '375px', backgroundColor: 'white' }}>
            <PromotionOneIsToOneAspectRatioComponent {...args} />
        </Box>
    </Box>
);


export const Primary = Template.bind({});
Primary.args = {
    ...mockComponent,
    __ui_id__ : "3333333",
    component_id: Component.PromotionOneIsToOneAspectRatio,
    properties_data: {    
        image: 'https://i.im.ge/2022/10/13/2qHPSF.Image-1.png',
        img_alt_text: "image alth text name",
        title: 'Explore Honda Center',
        description: "mock description",
        btn_text: "button text",
        action: {
            type: '',
            page_id: 'explorehondacenter',
            page_link: 'linkToExploreCenter',
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
}