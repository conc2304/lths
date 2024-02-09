import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import CalendarViewToolbar from './index';
import colors from '../../../../common/colors';
import { EditorProvider } from '../../../../context';
import mockComponent from '../../../../context/mock-data';
import { Component } from '../../enum';
import { CalendarViewComponentProps } from '../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof CalendarViewToolbar> = {
  component: CalendarViewToolbar,
  title: 'core/ Components/ calendar-view / Toolbar',
  parameters: {
    backgrounds: {
      default: 'sidebar',
      values: [
        { name: 'sidebar', value: colors.sidebar.background },
      ],
    },
  },
  decorators: [
    (Story) => (
      <EditorProvider initialValue={{components: []}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Story />
        </LocalizationProvider>
      </EditorProvider>
    ),
  ],
};
export default Story;


const Template: StoryFn<CalendarViewComponentProps> = (args) => (
    <CalendarViewToolbar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...mockComponent,
  __ui_id__: '3333333',
  component_id: Component.CalendarView,
  data: {
    tab_mode: 'scrollable',
    start_month: '0',
    start_year: '2001',
    end_month: '5',
    end_year: '2001',
    selected_month: '', 
    selected_year: '',
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