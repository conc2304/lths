import { Box } from '@mui/material';

import ScheduleListComponent from '.';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ScheduleListComponent> = {
  component: ScheduleListComponent,
  title: 'core/ Components/ schedule-list / Component',
};
export default Story;

const Template: StoryFn<typeof ScheduleListComponent> = (args) => (
  <Box
    sx={{
      backgroundColor: 'rgb(245, 245, 245)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{ width: '375px', backgroundColor: 'white' }}>
      <ScheduleListComponent {...args} />
    </Box>
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  __ui_id__: '12345',
  component_id: Component.ScheduleList,
  data: {
    allow_infinite_scroll: false,
    update_frequency_in_ms: 15000,
    selected_month: '1',
    selected_year: '2024',
    is_show_ingame_btn_icon: true,
    btn_more_info_txt: 'More Info',
    btn_buy_tickets_txt: 'Buy Tickets',
    btn_ingame_txt: 'Real-time',
    btn_post_game_txt: 'Game Recap',
  },
};

Primary.argTypes = {
  __ui_id__: { table: { disable: true } },
  component_id: { table: { disable: true } },
  _id: { table: { disable: true } },
  name: { table: { disable: true } },
  display_order: { table: { disable: true } },
  variation_id: { table: { disable: true } },
};
