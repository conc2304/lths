import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { subDays, subHours, subMonths } from 'date-fns';
import { DateRangeSelector } from './index';

const Story: ComponentMeta<typeof DateRangeSelector> = {
  component: DateRangeSelector,
  title: 'Inputs/ Date Range Selector',
};
export default Story;

const Template: ComponentStory<typeof DateRangeSelector> = (args) => (
  <DateRangeSelector {...args} />
);

const now = new Date();
const ButtonGroupConf = [
  {
    label: '1 Hour',
    value: subHours(now, 1),
  },
  {
    label: '1 Day',
    value: subDays(now, 1),
  },
  {
    label: '7 Days',
    value: subDays(now, 7),
  },
  {
    label: '30 Days',
    value: subDays(now, 30),
  },
  {
    label: '3 Months',
    value: subMonths(now, 3),
  },
  {
    label: '6 Months',
    value: subMonths(now, 6),
  },
  {
    label: '12 Months',
    value: subMonths(now, 12),
  },
];

export const Primary = Template.bind({});
Primary.args = {
  dateOptions: ButtonGroupConf,
  onChange: ({startDate, endDate}) => {
    console.log('date changed', startDate, endDate);
  }
};
