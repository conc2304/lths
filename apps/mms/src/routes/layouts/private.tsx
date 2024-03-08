import { Box, alpha, darken, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Twirl as Hamburger } from 'hamburger-react';

import { DashboardLayout, useLayoutActions } from '@lths/shared/ui-layouts';
import { WebEnvName, getAppEnvironmentName } from '@lths/shared/utils';

import { LitehouseLogoIcon, LitehouseLogoText } from '../../assets/icon';
import { UserActionMenu } from '../../components/layouts';
import sections from '../../pages/paths';

const HeaderLeft = () => {
  const theme = useTheme();

  const currEnv = getAppEnvironmentName(process.env.NX_PUBLIC_WEB_ENV);
  const prodThemes: WebEnvName[] = ['production', 'local'];
  const isProdLikeEnv = prodThemes.includes(currEnv);
  const useProdTheme = currEnv ? isProdLikeEnv : true;
  const appBarTextColor = theme.palette.getContrastText(theme.palette.appBar.background);

  return (
    <Box
      data-testid="Toolbar-HeaderLeft--root"
      sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
    >
      <LitehouseLogoIcon
        scale={1}
        gradientColorBottom={useProdTheme ? undefined : appBarTextColor}
        gradientColorTop={useProdTheme ? undefined : appBarTextColor}
      />
      <LitehouseLogoText fill={appBarTextColor} scale={1} wrapperSx={{ ml: 2 }} />
      <Typography
        variant="body1"
        sx={{
          pl: 2,
          color: alpha(appBarTextColor, 0.65),
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
};

const drawerHeader = (
  <Typography variant="h6" align="center" sx={{ height: (theme) => theme.mixins.toolbar.height }}>
    MMS 1.0
  </Typography>
);

const DrawerIcon = () => {
  const { drawerVisible } = useLayoutActions();
  const theme = useTheme();

  return (
    <Hamburger direction="right" size={18} toggled={drawerVisible} color={darken(theme.palette.common.white, 0.1)} />
  );
};

const headerRight = <UserActionMenu />;

export const PrivateLayout = (
  <DashboardLayout
    sections={sections}
    headerLeft={<HeaderLeft />}
    headerRight={headerRight}
    drawerHeader={drawerHeader}
    fixedHeader={true}
    drawerIcon={<DrawerIcon />}
  />
);
