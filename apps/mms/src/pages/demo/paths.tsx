import PagesIcon from '@mui/icons-material/DocumentScanner';
import DraftsIcon from '@mui/icons-material/Drafts';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Demo',
      icon: <PagesIcon />,
      path: '/demo/pages',
      file: '/insights/notification-page',
      items: [
        {
          title: 'Charts Page',
          icon: <DraftsIcon />,
          path: '/demo/charts',
          file: '/demo/chart-page',
        },
        {
          title: 'Filter Page',
          icon: <DraftsIcon />,
          path: '/demo/filters',
          file: '/demo/design-system',
        },
        {
          title: 'Sample Page',
          icon: <PagesIcon />,
          path: '/demo/sample',
          file: '/demo/sample-page',
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
