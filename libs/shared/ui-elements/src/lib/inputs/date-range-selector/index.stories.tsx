import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateRangeSelector } from './index';
import {ButtonGroupConf} from './mock-button-ranges';

const Story: ComponentMeta<typeof DateRangeSelector> = {
  component: DateRangeSelector,
  title: 'Inputs/ Date Range Selector',
};
export default Story;

const Template: ComponentStory<typeof DateRangeSelector> = (args) => (
  <DateRangeSelector {...args} />
);



export const Primary = Template.bind({});
Primary.args = {
  dateOptions: ButtonGroupConf,
  onChange: ({startDate, endDate}) => {
    console.log('date changed', startDate, endDate);
  }
};
