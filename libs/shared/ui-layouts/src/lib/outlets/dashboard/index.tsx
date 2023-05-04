import { useEffect, useMemo } from 'react';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet, useLocation } from 'react-router-dom';

import { BreadcrumbTrail } from './content';
import Drawer from './drawer';
import { LayoutExtendedProps } from './drawer/types';
import Header from './header';
import { setDrawerVisibility, useLayout } from '../../context';
import { findRouteTitleByPath } from '../utils/data-utils';

const DashboardLayout = ({
  sections,
  drawerIcon,
  drawerHeader,
  headerLeft,
  headerRight,
  fixedHeader,
}: LayoutExtendedProps) => {
  const theme = useTheme();
  const isMiniScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const {
    // state: { drawerVisible },
    dispatch,
  } = useLayout();
  const location = useLocation();
  const paths = useMemo(() => findRouteTitleByPath(sections, location.pathname), [sections, location.pathname]);

  // set media wise responsive drawer
  useEffect(() => {
    setDrawerVisibility(dispatch, !isMiniScreen);
  }, [isMiniScreen]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header headerLeft={headerLeft} headerRight={headerRight} fixedHeader={fixedHeader} />
      <Drawer sections={sections} drawerHeader={drawerHeader} fixedHeader={fixedHeader} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Toolbar />
        {/* <---toolbar is added here to push down the breadcrumbs menu or TODO:add a gutter equivalent of navbar size*/}
        <BreadcrumbTrail paths={paths} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
