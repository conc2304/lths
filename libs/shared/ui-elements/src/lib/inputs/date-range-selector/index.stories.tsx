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

export const Primary = Template.bind({});
Primary.args = {};
