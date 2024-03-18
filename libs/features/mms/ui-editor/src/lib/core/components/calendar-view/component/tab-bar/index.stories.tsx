import TabBar from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof TabBar> = {
  component: TabBar,
  title: 'core/ Components / calendar-view / Component / tab-bar',
};
export default Story;

const Template: StoryFn<typeof TabBar> = (args) => (
  <TabBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  selectedMonthAndYear: { month: 5, year: 2024 },
  startMonthAndYear: { month: 0, year: 2024 },
  endMonthAndYear: { month: 10, year: 2024 },
}

Primary.argTypes = {
  selectedMonthAndYear: { control: 'object' },
  startMonthAndYear: { control: 'object' },
  endMonthAndYear: { control: 'object' },
};
