import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { LthsButtonGroup } from './button-group';

const Story: ComponentMeta<typeof LthsButtonGroup> = {
  component: LthsButtonGroup,
  title: 'LthsButtonGroup',
};
export default Story;

const ButtonGroupConf: Array<{ label: string; value: string|number;onClick: (value: string | number) => void }> = [
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
      console.log(value)
    },
  },
];

const Template: ComponentStory<typeof LthsButtonGroup> = (args) => (
  <LthsButtonGroup {...args} />
);

export const InfoOutlined = Template.bind({});
InfoOutlined.args = {
  buttons: ButtonGroupConf,
  orientation: 'horizontal',
  color: 'info',
  variant: 'outlined'
};

export const PrimaryOutlined = Template.bind({});
PrimaryOutlined.args = {
  buttons: ButtonGroupConf,
  orientation: 'horizontal',
  color: 'primary'
};

export const PrimaryContained = Template.bind({});
PrimaryContained.args = {
  buttons: ButtonGroupConf,
  orientation: 'horizontal',
  color: 'primary',
  variant: 'contained'
};


