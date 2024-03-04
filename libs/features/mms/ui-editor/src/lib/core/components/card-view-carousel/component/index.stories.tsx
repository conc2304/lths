import React from 'react';
import { Box } from '@mui/material';

import CardViewCarouselComponent from './index';
import { MOBILE_SCREEN_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof CardViewCarouselComponent> = {
  component: CardViewCarouselComponent,
  title: 'core/ Components / card-view-carousel / Component',
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

const Template: StoryFn<typeof CardViewCarouselComponent> = (args) => (
  <CardViewCarouselComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponentProps,
  __ui_id__: '3333333',
  component_id: Component.CardViewCarousel,
  data: {
    sub_component_data: [
      {
        image: 'https://Image-1.png',
        action: { type: '', page_id: 'pageId1', page_link: 'pageLink1' },
      },
      {
        image: 'https://Image-2.png',
        action: { type: '', page_id: 'pageId2', page_link: 'pageLink2' },
      },
      {
        image: 'https://Image-3.png',
        action: { type: '', page_id: 'pageId3', page_link: 'pageLink3' },
      },
      {
        image: 'https://Image-4.png',
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
