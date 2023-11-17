import { Box } from '@mui/material';

import HeroEventComponent from './index';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HeroEventComponent> = {
  component: HeroEventComponent,
  title: 'core/Components/HeroEvent/Component',
};
export default Story;

const Template: StoryFn<typeof HeroEventComponent> = (args) => (
  <Box sx={{ backgroundColor: 'rgb(245, 245, 245)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{ width: '375px', backgroundColor: 'white' }}>
      <HeroEventComponent {...args} />
    </Box>
  </Box>
);
export const Primary = Template.bind({});
Primary.agrs = {
  ...mockComponentProps,
  __ui_id__: '3333333',
  component_id: Component.HeroEvent,
  data: {},
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
