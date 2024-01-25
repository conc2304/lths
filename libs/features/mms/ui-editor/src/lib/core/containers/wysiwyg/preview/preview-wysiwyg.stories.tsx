import { PreviewWysiwyg } from '../index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof PreviewWysiwyg> = {
  component: PreviewWysiwyg,
  title: 'core / Containers / wysiwyg / preview-wysiwyg',
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
};
export default Story;

const Template: StoryFn<typeof PreviewWysiwyg> = (args) => (
  <PreviewWysiwyg {...args} />
);

export const Primary = Template.bind({});
export const UnsupportedComponents = Template.bind({});

// set args
Primary.args = {
  components: [],
}
UnsupportedComponents.args = {
  components: [
    {
      _id: "unique_id",
      component_id: "cUnsupportedComponent",
      name: "UnsupportedComponent",
      image_url: "no.image.1",
      data: {},
      schema: {},
    },
    {
      _id: "unique_id2",
      component_id: "cUnsupportedComponent2",
      name: "UnsupportedComponent2",
      image_url: "no.image.2",
      data: {},
      schema: {},
    },
    {
      _id: "unique_id3",
      component_id: "cUnsupportedComponent3",
      name: "UnsupportedComponent3",
      image_url: "no.image.3",
      data: {},
      schema: {},
    }
  ],
}

// set argTypes
Primary.argTypes = {
  components: { control: 'object' },
}
UnsupportedComponents.argTypes = Primary.argTypes;