import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Twirl as Hamburger } from 'hamburger-react';

import { DashboardLayout } from '@lths/shared/ui-layouts';

import { LitehouseLogoIcon, LitehouseLogoText } from '../../assets/icon';
import { UserActionMenu } from '../../components/layouts';
import sections from '../../pages/paths';

const headerLeft = (
  <Box
    data-testid="Toolbar-HeaderLeft--root"
    sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
  >
    <LitehouseLogoIcon scale={1} />
    <LitehouseLogoText fill="#FFF" scale={1} wrapperSx={{ ml: 2 }} />
    <Typography
      variant="body1"
      sx={{
        pl: 2,
        color: (theme) => theme.palette.grey[400],
        fontSize: '0.875rem',
        fontWeight: 'bold',
        lineHeight: '160%',
        letterSpacing: '0.00625rem;',
      }}
    >
      Mobile Management System
    </Typography>
  </Box>
);

const drawerHeader = (
  <Typography variant="h6" align="center" sx={{ height: (theme) => theme.mixins.toolbar.height }}>
    MMS 1.0
  </Typography>
);

const headerRight = <UserActionMenu />;

export const PrivateLayout = (
  <DashboardLayout
    sections={sections}
    headerLeft={headerLeft}
    headerRight={headerRight}
    drawerHeader={drawerHeader}
    fixedHeader={true}
    drawerIcon={<Hamburger direction="right" size={18} />}
  />
);
