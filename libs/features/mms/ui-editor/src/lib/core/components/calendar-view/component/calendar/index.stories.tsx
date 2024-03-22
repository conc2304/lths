import Calendar from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'core/ Components / calendar-view / Component / calendar',
};
export default Story;

const Template: StoryFn<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  month: 0,
  year: 2024,
  isRowNumStatic: undefined,
  height: undefined,
}

Primary.argTypes = {
  month: { control: { type: 'number', min: 0, max: 11, step: 1 } },
  year: { control: 'number' },
  isRowNumStatic: { control: 'boolean' },
  height: { control: 'number' },
};
