import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateRangeSelector } from './index';

const Story: ComponentMeta<typeof DateRangeSelector> = {
  component: DateRangeSelector,
  title: 'DateRangeSelector',
};
export default Story;

const Template: ComponentStory<typeof DateRangeSelector> = (args) => (
  <DateRangeSelector {...args} />
);

const ButtonGroupConf: Array<{
  label: string;
  value: string | number;
  onClick: (value: string | number) => void;
}> = [
  {
    label: '1 Hour',
    value: '1 Hour',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '1 Day',
    value: '1 Day',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '7 Days',
    value: '7 Days',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '30 Days',
    value: '30 Days',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '3 Months',
    value: '3 Months',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '6 Months',
    value: '6 Months',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '12 Months',
    value: '12 Months',
    onClick: (value: string | number) => {
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
