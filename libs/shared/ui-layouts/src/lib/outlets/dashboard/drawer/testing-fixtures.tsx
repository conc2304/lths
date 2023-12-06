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

export const MockSections = [
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
