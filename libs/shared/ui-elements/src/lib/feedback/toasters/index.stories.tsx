import { LayoutToaster } from '.';

import type { StoryFn, Meta } from '@storybook/react';

const Story: Meta<typeof LayoutToaster> = {
  component: LayoutToaster,
  title: 'Feedback/ Layout Toaster',
};
export default Story;

const Template: StoryFn<typeof LayoutToaster> = (args) => <LayoutToaster {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
