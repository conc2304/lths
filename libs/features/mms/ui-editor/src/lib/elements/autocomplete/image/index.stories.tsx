import ImageAutocomplete from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ImageAutocomplete> = {
  component: ImageAutocomplete,
  title: 'elements/ Autocomplete/ image',
};
export default Story;

const Template: StoryFn<typeof ImageAutocomplete> = (args) => {
  const onChange = (value: string) => {
    args.value = value;
  };

  return (
    <ImageAutocomplete {...args} onChange={onChange} />
  )
};

export const Primary = Template.bind({});
Primary.args = {
    label: "label name",
    value: "image.src.2",
    data: [
      { label: "image 1", value: "image.src.1" },
      { label: "image 2", value: "image.src.2" },
      { label: "image 3", value: "image.src.3" }
    ],
}

Primary.argTypes = {
    label: { control: 'text'},
    value: { control: 'text'},
    data: { control: 'object'},
}