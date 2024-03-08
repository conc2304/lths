import ExternalDataToolbar from './index';
import colors from '../../../../common/colors';

import type { Meta, StoryFn } from '@storybook/react';


const Story: Meta<typeof ExternalDataToolbar> = {
  component: ExternalDataToolbar,
  title: 'core / Components / external data / Toolbar',
  parameters: {
    backgrounds: {
      default: 'sidebar',
      values: [
        { name: 'sidebar', value: colors.sidebar.background },
      ],
    },
  },
};
export default Story;

const Template: StoryFn<typeof ExternalDataToolbar> = (args) => (
  <ExternalDataToolbar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    id: '3333333',
    component_id: '44444444',
    title: 'Event',
    desc: 'Content and data from NHL.com.',
};

Primary.argTypes = {
  id: { table: { disable: true } },
  component_id: { table: { disable: true } },
};
