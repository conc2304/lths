import PagesIcon from '@mui/icons-material/DocumentScanner';
import DraftsIcon from '@mui/icons-material/Drafts';
const section = {
  items: [
    {
      title: 'Demo',
      icon: <PagesIcon />,
      path: '/pages',
      file: '/insights/notification-page',
      items: [
        {
          title: 'Charts Page',
          icon: <DraftsIcon />,
          path: '/demo/charts',
          file: '/chart-page',
        },
        {
          title: 'Filter Page',
          icon: <DraftsIcon />,
          path: '/demo/filters',
          file: '/design-system',
        },
        {
          title: 'Sample Page',
          icon: <PagesIcon />,
          path: '/demo/sample',
          file: '/sample-page',
        },
        {
          title: 'Login',
          icon: <DraftsIcon />,
          path: '/login',
        },
      ],
    },
  ],
};
export default section;
