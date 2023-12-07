import { useEffect, useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

import { BreadcrumbPathProps, BreadcrumbTrail } from './content';
import { DrawerSectionProps, LayoutExtendedProps } from './drawer/sections/types';
import Drawer from './drawer/side-nav-menu';
import Header from './header';
import { useLayoutActions } from '../../context';
import { findPath } from '../utils/data-utils';

export const DashboardLayout = ({
  sections,
  drawerHeader,
  headerLeft,
  headerRight,
  fixedHeader,
  drawerIcon,
}: LayoutExtendedProps) => {
  const { setPageTitle, breadcrumbs, pageTitle } = useLayoutActions();
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
    <Box sx={{ display: 'flex', width: '100%' }} data-testid="Dashboard-layout--root">
      <Header headerLeft={headerLeft} headerRight={headerRight} fixedHeader={fixedHeader} drawerIcon={drawerIcon} />
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
