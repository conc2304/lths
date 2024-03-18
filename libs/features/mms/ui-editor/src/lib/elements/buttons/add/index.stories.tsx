import AddButton from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof AddButton> = {
  component: AddButton,
  title: 'elements/ buttons / add',
};
export default Story;

const Template: StoryFn<typeof AddButton> = (args) => {
  return (
    <AddButton {...args}>
        {args.children}
    </AddButton>
  )
};

export const Primary = Template.bind({});
export const CustomChildren = Template.bind({});
Primary.args = {
    children: 'add Item', 
    sx: { },
}
CustomChildren.args = {
    children: <div style={{ color: 'green' }}>add Item</div>, 
    sx: { },
}

Primary.argTypes = {
    children: { control: 'text'},
    sx: { control: 'object'},
}
CustomChildren.argTypes = {
    children: { control: 'object'},
    sx: { control: 'object'},
}