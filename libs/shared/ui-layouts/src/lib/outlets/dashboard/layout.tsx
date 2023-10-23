import { useEffect, useState } from 'react';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet, useLocation } from 'react-router-dom';

import { BreadcrumbPathProps, BreadcrumbTrail } from './content';
import Drawer from './drawer';
import { DrawerSectionProps, LayoutExtendedProps } from './drawer/sections/types';
import Header from './header';
import { useLayoutActions } from '../../context';
import { findPath } from '../utils/data-utils';

export const DashboardLayout = ({
  sections,
  drawerHeader,
  headerLeft,
  headerRight,
  fixedHeader,
}: LayoutExtendedProps) => {
  const theme = useTheme();
  const isMiniScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const { setDrawerVisibility, setPageTitle, breadcrumbs, pageTitle } = useLayoutActions();
  const location = useLocation();

  const checkManualPaths = (
    manualPaths: BreadcrumbPathProps[],
    currentPath: string,
    sections: DrawerSectionProps[]
  ) => {
    if (manualPaths != null) return manualPaths;
    else return findPath(currentPath, sections);
  };

  const [paths, setPaths] = useState<BreadcrumbPathProps[]>([]);

  useEffect(() => {
    setDrawerVisibility(!isMiniScreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMiniScreen]);

  // set media wise responsive drawer
  useEffect(() => {
    const paths = checkManualPaths(breadcrumbs, location.pathname, sections);
    setPaths(paths);
    if (paths.length > 0) {
      setPageTitle(paths[paths.length - 1].title);
    } else {
      // if there are no paths then that means we are at "/" aka Home
      setPageTitle('Home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, breadcrumbs, location.pathname]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header headerLeft={headerLeft} headerRight={headerRight} fixedHeader={fixedHeader} />
      <Drawer sections={sections} drawerHeader={drawerHeader} fixedHeader={fixedHeader} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Toolbar />
        {/* <---toolbar is added here to push down the breadcrumbs menu or TODO:add a gutter equivalent of navbar size*/}
        <BreadcrumbTrail paths={paths} activePageTitle={pageTitle} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
