import ToolbarLabelWithClose from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ToolbarLabelWithClose> = {
  component: ToolbarLabelWithClose,
  title: 'elements/ labels / toolbar-label-with-close',
};
export default Story;

const Template: StoryFn<typeof ToolbarLabelWithClose> = (args) => {
  return (
    <ToolbarLabelWithClose {...args} />
  )
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'A Title',
  onClose: () => null,
}

Primary.argTypes = {
  label: { control: 'text'},
}