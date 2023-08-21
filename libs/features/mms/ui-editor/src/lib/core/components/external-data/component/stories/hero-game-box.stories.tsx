import ExternalDataToolbar from '../index';
import type { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';

const Story: Meta<typeof ExternalDataToolbar> = {
  component: ExternalDataToolbar,
  title: 'core/ Components/ live data/ hero-game-box / Component',
};
export default Story;

const Template: StoryFn<typeof ExternalDataToolbar> = (args) => (
  <Box
    sx={{
      backgroundColor: 'rgb(245, 245, 245)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{ width: '375px', backgroundColor: 'white' }}>
      <ExternalDataToolbar {...args} />
    </Box>
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  img_alt: 'Hero GameBox',
  id: '3333333',
  image: 'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cHeroGameBox.svg',
};

Primary.argTypes = {
  __ui_id__: { table: { disable: true } },
  component_id: { table: { disable: true } },
  _id: { table: { disable: true } },
  name: { table: { disable: true } },
  description: { table: { disable: true } },
  category: { table: { disable: true } },
  image_url: { table: { disable: true } },
  display_order: { table: { disable: true } },
  variation_id: { table: { disable: true } },
  schema: { table: { disable: true } },
};
