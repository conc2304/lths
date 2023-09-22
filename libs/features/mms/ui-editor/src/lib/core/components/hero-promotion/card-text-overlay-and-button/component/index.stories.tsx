import { Box } from '@mui/material';

import HeroPromotionCardTextOverlayAndButtonComponent from './index';
import mockComponentProps from '../../../../../context/mock-data';
import { Component } from '../../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HeroPromotionCardTextOverlayAndButtonComponent> = {
  component: HeroPromotionCardTextOverlayAndButtonComponent,
  title: 'core/ Components/ hero-promotion-card-text-overlay-and-button / Component',
};
export default Story;

const Template: StoryFn<typeof HeroPromotionCardTextOverlayAndButtonComponent> = (args) => (
  <Box
    sx={{
      backgroundColor: 'rgb(245, 245, 245)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{ width: '375px', backgroundColor: 'white' }}>
      <HeroPromotionCardTextOverlayAndButtonComponent {...args} />
    </Box>
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponentProps,
  __ui_id__: '3333333',
  component_id: Component.HeroPromotionCardTextOverlayAndButton,
  data: {
    image: 'https://i.im.ge/2022/10/13/2qHPSF.Image-2.png',
    img_alt_text: 'image alth text name',
    title: 'Explore Honda Center',
    description: 'descriptionTest',
    btn_text: 'button text',
    action: {
      type: '',
      page_id: 'explorehondacenter',
      page_link: 'linkToExploreCenter',
    },
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
