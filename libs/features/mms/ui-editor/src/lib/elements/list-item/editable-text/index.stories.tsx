import EditableListItemText from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof EditableListItemText> = {
  component: EditableListItemText,
  title: 'elements/ list-item / editable-text',
};
export default Story;

const Template: StoryFn<typeof EditableListItemText> = (args) => {
  return (
    <EditableListItemText {...args} />
  )
};

export const Primary = Template.bind({});
Primary.args = {
    text: "Item 10", 
    sx: { },
    textStyle: { }, 
    onLabelClick: () => null,
    onSave: () => null,
}

Primary.argTypes = {
    text: { control: 'text'},
    sx: { control: 'object'},
    textStyle: { control: 'object'},
}