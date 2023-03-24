import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { subDays, subHours, subMonths } from 'date-fns';
import { DateRangeSelector } from './index';

const Story: ComponentMeta<typeof DateRangeSelector> = {
  component: DateRangeSelector,
  title: 'DateRangeSelector',
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
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '1 Day',
    value: subDays(now, 1),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '7 Days',
    value: subDays(now, 7),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '30 Days',
    value: subDays(now, 30),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '3 Months',
    value: subMonths(now, 3),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '6 Months',
    value: subMonths(now, 6),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '12 Months',
    value: subMonths(now, 12),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
];

export const Primary = Template.bind({});
Primary.args = {
  dateOptions: ButtonGroupConf,
  onChange: ({startDate, endDate}) => {
    console.log('date changed', startDate, endDate);
  }
};
