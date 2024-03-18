import { Box } from '@mui/material';

import CalendarViewComponent from './index';
import { MOBILE_SCREEN_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';


import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof CalendarViewComponent> = {
  component: CalendarViewComponent,
  title: 'core/ Components/ calendar-view / Component',
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

const Template: StoryFn<typeof CalendarViewComponent> = (args) => (
  <CalendarViewComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponentProps,
  __ui_id__: '3333333',
  component_id: Component.CalendarView,
  data: {
    tab_mode: 'scrollable',
    start_month: '1',
    start_year: '2001',
    end_month: '5',
    end_year: '2001',
    selected_month: '4', 
    selected_year: '2001',
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