import PagesIcon from '@mui/icons-material/DocumentScanner';
import DraftsIcon from '@mui/icons-material/Drafts';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PaletteIcon from '@mui/icons-material/Palette';
import FlowIcon from '@mui/icons-material/Schema';
import StarBorder from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import { DashboardLayout, DrawerSectionProps } from '@lths/shared/ui-layouts';

import { Profile } from '../components/layouts';

const headerLeft = <Typography variant="h6">Mobile Management System</Typography>;
const drawerHeader = (
  <Typography variant="h6" align="center">
    MMS1.0
  </Typography>
);
const headerRight = <Profile />;
const sections: DrawerSectionProps[] = [
  {
    //header: "Header1",
    items: [
      {
        title: 'Home',
        icon: <HomeIcon />,
        path: '/emails/sent',
      },
    ],
  },
  {
    // header: "Header 2",
    items: [
      {
        title: 'Themes',
        icon: <PaletteIcon />,
        path: '/themes/list',
      },

      {
        title: 'Pages',
        icon: <PagesIcon />,
        path: '/pages',
        items: [
          {
            title: 'Charts Page',
            icon: <DraftsIcon />,
            path: '/dashboard/charts',
          },
          {
            title: "Jose's Page",
            icon: <DraftsIcon />,
            path: '/dashboard/jose',
          },
          {
            title: 'Login',
            icon: <DraftsIcon />,
            path: '/login',
          },
          {
            title: 'Sample Page',
            icon: <PagesIcon />,
            path: '/emails/Starred',
          },
          {
            title: 'Starred',
            icon: <StarBorder />,
            path: '/emails/Starred2',
          },
        ],
      },
      {
        title: 'New Section',
        icon: <PagesIcon />,
        items: [
          {
            title: 'Charts Page',
            icon: <DraftsIcon />,
            path: '/dashboard/charts',
          },
        ],
      },
      {
        title: 'Insights',
        icon: <InsightsIcon />,
        path: '/insights/overview',
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
          },
          {
            title: 'Components',
            icon: <GridViewIcon />,
            path: '/insights/components',
          },
          {
            title: 'Users',
            icon: <ManageAccountsIcon />,
            path: '/Insights/Users',
          },
          {
            title: 'Notifications',
            icon: <NotificationsActiveIcon />,
            path: '/insights/notifications',
          },
          {
            title: 'Overview',
            icon: <LiveTvIcon />,
            path: '/insights/overview',
          },
        ],
      },
    ],
  },
];

const DashboardExtendedLayout = (
  <DashboardLayout
    sections={sections}
    headerLeft={headerLeft}
    headerRight={headerRight}
    drawerHeader={drawerHeader}
    fixedHeader={true}
  />
);

export default DashboardExtendedLayout;
