import Typography from '@mui/material/Typography';

import { DashboardLayout } from '@lths/shared/ui-layouts';

import { Profile } from '../../components/layouts';
import sections from '../../pages/paths';

const headerLeft = (
  <Typography
    variant="h6"
    sx={{ pl: 1, color: '#fff', fontSize: '1.15rem', fontWeight: 500, lineHeight: '160%', letterSpacing: '0.00938rem' }}
  >
    Mobile Management System
  </Typography>
);

const drawerHeader = (
  <Typography variant="h6" align="center">
    MMS 1.0
  </Typography>
);

const headerRight = <Profile />;

export const PrivateLayout = (
  <DashboardLayout
    sections={sections}
    headerLeft={headerLeft}
    headerRight={headerRight}
    drawerHeader={drawerHeader}
    fixedHeader={true}
  />
);
