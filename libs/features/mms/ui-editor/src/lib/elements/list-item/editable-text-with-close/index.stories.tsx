import EditableListItemTextWithClose from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof EditableListItemTextWithClose> = {
  component: EditableListItemTextWithClose,
  title: 'elements/ list-item / editable-text-with-close',
};
export default Story;

const Template: StoryFn<typeof EditableListItemTextWithClose> = (args) => {
  return (
    <EditableListItemTextWithClose {...args} />
  )
};

export const Primary = Template.bind({});
Primary.args = {
    text: "Item 10", 
    sx: { },
    textStyle: { }, 
    onSave: () => null,
    onClose: () => null,
}

Primary.argTypes = {
    text: { control: 'text'},
    sx: { control: 'object'},
    textStyle: { control: 'object'},
}