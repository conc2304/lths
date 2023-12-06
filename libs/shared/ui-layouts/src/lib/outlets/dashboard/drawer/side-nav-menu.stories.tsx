import { MemoryRouter } from 'react-router-dom';

import MainDrawer from './side-nav-menu';
import { MockSections } from './testing-fixtures';
import { LayoutProvider } from '../../../context';

import type { Meta, StoryFn } from '@storybook/react';

const withRouter = (Story: StoryFn) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);
const withLayoutProvider = (Story: StoryFn) => (
  <LayoutProvider>
    <Story />
  </LayoutProvider>
);

const Story: Meta<typeof MainDrawer> = {
  component: MainDrawer,
  title: 'Layouts/Drawer/Side Bar Navigation Menu',
  decorators: [withRouter, withLayoutProvider],
};

export default Story;

export const Primary = {
  args: {
    sections: MockSections,
    drawerHeader: <p>MMS</p>,
    fixedHeader: true,
  },
};
