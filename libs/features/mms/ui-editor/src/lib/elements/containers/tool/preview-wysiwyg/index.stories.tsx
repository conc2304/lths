import ToolPreviewWysiwyg from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ToolPreviewWysiwyg> = {
  component: ToolPreviewWysiwyg,
  title: 'elements/ containers / tool / preview-wysiwyg',
};
export default Story;

const Template: StoryFn<typeof ToolPreviewWysiwyg> = (args) => {
  return (
    <ToolPreviewWysiwyg {...args} />
  )
};

export const Primary = Template.bind({});
export const Loading = Template.bind({});
export const Static = Template.bind({});


// set args
Primary.args = {
  title: "A Title", 
  desc: 'A Desc',
  isStaticPage: false,
  data: [],
  isLoading: false, 
  onClose: () => null,
}
Loading.args = {
  ...Primary.args,
  isLoading: true, 
}
Static.args = {
  ...Primary.args,
  isStaticPage: true,
  image: '',
}

// set argTypes
Primary.argTypes = {
  title: { control: 'text'},
  desc: { control: 'text'},
  isLoading: { control: 'boolean'},
  isStaticPage: { control: 'boolean'},
  image: { control: 'text'},
}
Loading.argTypes = Primary.argTypes;