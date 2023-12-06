import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import {
  CalendarTodayOutlined,
  EditAttributesOutlined,
  FloodOutlined,
  HomeOutlined,
  NotificationAddOutlined,
  PagesOutlined,
  SaveAltOutlined,
  TocOutlined,
  UploadFileOutlined,
  VerifiedUserOutlined,
} from '@mui/icons-material';
import { LayoutProvider, useLayoutActions } from 'libs/shared/ui-layouts/src/lib/context';
import { MemoryRouter } from 'react-router-dom';

import MainDrawer from './index';

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
  title: 'Layouts/Drawer/Navigation Menu',
  decorators: [withRouter, withLayoutProvider],
  argTypes: {},
};

export default Story;

const sections = [
  {
    items: [
      {
        title: 'Home',
        icon: <HomeOutlined />,
        path: '/',
      },
    ],
  },
  {
    items: [
      {
        title: 'Schedule',
        icon: <CalendarTodayOutlined />,
        path: '/schedule',
        file: '/schedule/schedule-page',
        hidden: false,
        items: [
          {
            title: 'Flood',
            icon: <FloodOutlined />,
            path: '/schedule/flood/:pageId',
            file: '/pages/editor',
            hidden: false,
          },
          {
            title: 'Save',
            icon: <SaveAltOutlined />,
            path: '/schedule/save/:pageId',
            file: '/pages/editor',
            hidden: false,
          },
          {
            title: 'Toc',
            icon: <TocOutlined />,
            path: '/schedule/toc/:pageId',
            file: '/pages/editor',
            hidden: false,
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'Pages',
        icon: <PagesOutlined />,
        path: '/pages',
        file: '/pages/list',
        items: [
          {
            title: 'Editor',
            icon: <EditAttributesOutlined />,
            path: '/pages/editor/:pageId',
            file: '/pages/editor',
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'Assets',
        icon: <UploadFileOutlined />,
        path: '/assets',
        file: '/assets/list',
      },
    ],
  },
  {
    items: [
      {
        title: 'Notifications',
        icon: <NotificationAddOutlined />,
        path: '/notifications',
        file: '/notifications/list',
        items: [
          {
            title: 'Editor',
            icon: <EditAttributesOutlined />,
            path: '/notifications/editor/:notificationId',
            file: '/notifications/editor',
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'User',
        icon: <VerifiedUserOutlined />,
        path: '/user',
        file: '/user/edit-profile-page',
        hidden: true,
        items: [{ title: 'Profile', path: '/user/profile', file: '/user/edit-profile-page', hidden: true }],
      },
    ],
  },
];

export const Primary = {
  args: {
    sections,
    drawerHeader: undefined,
    fixedHeader: true,
  },
};
