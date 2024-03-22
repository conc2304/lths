import { Box } from '@mui/material';

import HalfWidthCarouselFloatingTextComponent from './index';
import { MOBILE_SCREEN_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';


import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HalfWidthCarouselFloatingTextComponent> = {
  component: HalfWidthCarouselFloatingTextComponent,
  title: 'core/ Components/ half-width-carousel-floating-text / Component',
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

const Template: StoryFn<typeof HalfWidthCarouselFloatingTextComponent> = (args) => (
  <HalfWidthCarouselFloatingTextComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponentProps,
  __ui_id__: '3333333',
  component_id: Component.HalfWidthCarouselFloatingText,
  data: {
    sub_component_data: [
      {
        name: 'Carousel Name 1',
        image: 'image.one',
        img_alt_text: 'ImageAlt1',
        title: 'A Title 1',
        action: { type: 'native', page_id: 'pageId1', page_link: 'pageLink1' },
      },
      {
        name: 'Carousel Name 2',
        image: 'image.two',
        img_alt_text: 'ImageAlt2',
        title: 'A Title 2',
        action: { type: 'web', page_id: 'pageId2', page_link: 'pageLink2' },
      },
      {
        name: 'Carousel Name 3',
        image: 'image.three',
        img_alt_text: 'ImageAlt3',
        title: 'A Title 3',
        action: { type: 'native', page_id: 'pageId3', page_link: 'pageLink3' },
      },
      {
        name: 'Carousel Name 4',
        image: 'image.four',
        img_alt_text: 'ImageAlt4',
        title: 'A Title 4',
        action: { type: 'web', page_id: 'pageId4', page_link: 'pageLink4' },
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
