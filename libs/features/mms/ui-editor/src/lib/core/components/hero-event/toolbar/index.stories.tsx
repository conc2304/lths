import { Box } from '@mui/material';

import HeroEventToolbar from './index';
import { EditorProvider } from '../../../../context';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof HeroEventToolbar> = {
  component: HeroEventToolbar,
  title: 'core/Components/HeroEvent/Toolbar',
};
export default Story;
const Template: StoryFn<typeof HeroEventToolbar> = (args) => {
  const initialState = {
    components: [],
    selectedComponent: args,
  };

  return (
    <EditorProvider initialValue={initialState}>
      <Box sx={{ padding: '16px', backgroundColor: 'rgb(245, 245, 245)' }}>
        <HeroEventToolbar {...args} />
      </Box>
    </EditorProvider>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  ...mockComponentProps,
  __ui_id__: '3333333',
  Component_id: Component.HeroEvent,
  data: {},
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
