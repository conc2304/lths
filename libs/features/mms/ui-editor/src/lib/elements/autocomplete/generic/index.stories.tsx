import GenericAutocomplete from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof GenericAutocomplete> = {
  component: GenericAutocomplete,
  title: 'elements/ Autocomplete/ generic',
};
export default Story;

const Template: StoryFn<typeof GenericAutocomplete> = (args) => {
  const onChange = (value: string) => {
    args.value = value;
  };

  return (
    <GenericAutocomplete {...args} onChange={onChange} />
  )
};

export const Primary = Template.bind({});
Primary.args = {
    label: "label name",
    value: "value.1",
    data: [
      { label: "label 1", value: "value.1" },
      { label: "label 2", value: "value.2" },
      { label: "label 3", value: "value.3" }
    ],
}

Primary.argTypes = {
    label: { control: 'text'},
    value: { control: 'text'},
    data: { control: 'object'},
}