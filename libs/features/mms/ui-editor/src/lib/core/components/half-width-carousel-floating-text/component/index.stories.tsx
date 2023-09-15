import { Box } from '@mui/material';

import HalfWidthCarouselFloatingTextComponent from './index';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HalfWidthCarouselFloatingTextComponent> = {
  component: HalfWidthCarouselFloatingTextComponent,
  title: 'core/ Components/ half-width-carousel-floating-text / Component',
};
export default Story;

const Template: StoryFn<typeof HalfWidthCarouselFloatingTextComponent> = (args) => (
  <Box
    sx={{
      backgroundColor: 'rgb(245, 245, 245)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{ width: '375px', backgroundColor: 'white' }}>
      <HalfWidthCarouselFloatingTextComponent {...args} />
    </Box>
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.HalfWidthCarouselFloatingText,
  data: {
    sub_component_data: [
      {
        name: 'Carousel Name 1',
        image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-1.png',
        img_alt_text: 'ImageAlt1',
        title: 'A Title 1',
        action: { type: '', page_id: 'pageId1', page_link: 'pageLink1' },
      },
      {
        name: 'Carousel Name 2',
        image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-2.png',
        img_alt_text: 'ImageAlt2',
        title: 'A Title 2',
        action: { type: '', page_id: 'pageId2', page_link: 'pageLink2' },
      },
      {
        name: 'Carousel Name 3',
        image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-3.png',
        img_alt_text: 'ImageAlt3',
        title: 'A Title 3',
        action: { type: '', page_id: 'pageId3', page_link: 'pageLink3' },
      },
      {
        name: 'Carousel Name 4',
        image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-4.png',
        img_alt_text: 'ImageAlt4',
        title: 'A Title 4',
        action: { type: '', page_id: 'pageId4', page_link: 'pageLink4' },
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
