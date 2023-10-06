import { Box } from '@mui/material';

import HalfWidthTextComponent from './index';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HalfWidthTextComponent> = {
  component: HalfWidthTextComponent,
  title: 'core/ Components/ half-width-text-component / Component',
};
export default Story;

const Template: StoryFn<typeof HalfWidthTextComponent> = (args) => (
  <Box
    sx={{
      backgroundColor: 'rgb(245, 245, 245)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{ width: '375px', backgroundColor: '#121213' }}>
      <HalfWidthTextComponent {...args} />
    </Box>
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
    ...mockComponentProps,
    __ui_id__ : "3333333",
    component_id: Component.HalfWidthText,
    data: {    
      btn_text: 'Map',
      description: 'Test description pizza tastes good',
      icon: "icon url",
      image: "iamge url",
      section: 'Section 206',
      sub_title: 'Pizza, Drinks',
      text_color: 'string',
      title: 'Anaheim Pizza Co',
      action: {
        type: '',
        page_id: 'map page',
        page_link: 'maplink',
      },
    }
}

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
