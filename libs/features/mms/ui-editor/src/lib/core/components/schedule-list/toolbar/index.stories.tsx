import { Box } from '@mui/material';

import ScheduleListToolbar from './index';
import { EditorProvider } from '../../../../context';
import { Component } from '../../enum';
import { ScheduleListComponentProps } from '../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ScheduleListToolbar> = {
  component: ScheduleListToolbar,
  title: 'core/ Components/ schedule-list/ Toolbar',
};
export default Story;

type StoryArgs = ScheduleListComponentProps;

const Template: StoryFn<StoryArgs> = (args) => {
  const initialState = {
    components: [],
    selectedComponent: args,
  };

  return (
    <EditorProvider initialValue={initialState}>
      <Box sx={{ padding: '16px', backgroundColor: 'rgb(245, 245, 245)' }}>
        <ScheduleListToolbar {...args} />
      </Box>
    </EditorProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  __ui_id__: '12345',
  component_id: Component.ScheduleList,
  data: {
    allow_infinite_scroll: false,
    update_frequency_in_ms: 15000,
    selected_month: '1',
    selected_year: '2024',
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
