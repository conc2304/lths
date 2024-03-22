import { Box } from '@mui/material';

import ExternalDataComponent from './index';
import { MOBILE_SCREEN_WIDTH } from '../../../../common';
import colors from '../../../../common/colors';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ExternalDataComponent> = {
  component: ExternalDataComponent,
  title: 'core/ Components / external data / Component',
  parameters: {
    backgrounds: {
      default: 'editor',
      values: [
        { name: 'editor', value: colors.editor.background },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <Box sx={{ width: MOBILE_SCREEN_WIDTH, backgroundColor: colors.editor.mobile.background }}>
          <Story />
        </Box>
      </Box>
    ),
  ],
};
export default Story;

const Template: StoryFn<typeof ExternalDataComponent> = (args) => (
  <ExternalDataComponent key={args.image} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  id: '3333333',
  img_alt: 'External Data',
  image: 'test.img.test',
};

Primary.argTypes = {
  id: { table: { disable: true } },
  component_id: { table: { disable: true } },
};
