import PagesIcon from '@mui/icons-material/DocumentScanner';
import GridViewIcon from '@mui/icons-material/GridView';
import InsightsIcon from '@mui/icons-material/Insights';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FlowIcon from '@mui/icons-material/Schema';

import { SectionItemProps } from '../../routes/types';

const sections: SectionItemProps = {
  //You can pass header property if you like to see a header above the accordion, Example: header: "Analytics",
  items: [
    {
      title: 'Insights',
      icon: <InsightsIcon />,
      path: '/insights/overview',
      file: '/insights/overview-page',
      items: [
        {
          title: 'Flows',
          icon: <FlowIcon />,
          path: '/insights/flows',
        },
        {
          title: 'Pages',
          icon: <PagesIcon />,
          path: '/insights/pages',
          file: '/insights/pages-page',
          items: [
            {
              icon: <PagesIcon />,
              path: '/insights/pages',
            },
          ],
        },
        {
          title: 'Components',
          icon: <GridViewIcon />,
          path: '/insights/components',
        },
        {
          title: 'Users',
          icon: <ManageAccountsIcon />,
          path: '/insights/users',
          file: '/insights/users-page',
        },
        {
          title: 'Notifications',
          icon: <NotificationsActiveIcon />,
          path: '/insights/notifications',
          file: '/insights/notification-page',
          hidden: false,
          items: [
            {
              icon: <NotificationsActiveIcon />,
              path: '/insights/notifications/detail',
              file: '/detail-page',
              hidden: true,
            },
          ],
        },
        {
          title: 'Overview',
          icon: <LiveTvIcon />,
          path: '/insights/overview',
        },
      ],
    },
  ],
};

export default sections;
