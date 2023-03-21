import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateRangeInput } from './index';

const Story: ComponentMeta<typeof DateRangeInput> = {
  component: DateRangeInput,
  title: 'DateRangeInput',
};
export default Story;

const Template: ComponentStory<typeof DateRangeInput> = (args) => (
  <DateRangeInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
