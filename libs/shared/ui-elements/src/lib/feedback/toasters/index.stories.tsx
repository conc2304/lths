import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { LayoutToaster } from '.';

const Story: ComponentMeta<typeof LayoutToaster> = {
  component: LayoutToaster,
  title: 'Feedback/ Layout Toaster',
};
export default Story;

const Template: ComponentStory<typeof LayoutToaster> = (args) => (
  <LayoutToaster {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
