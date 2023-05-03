import { useEffect, useMemo } from 'react';
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
  //drawerIcon,
  drawerHeader,
  headerLeft,
  headerRight,
  fixedHeader,
}: LayoutExtendedProps) => {
  const theme = useTheme();
  const isMiniScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const { setDrawerVisibility, setBreacrumbsHook, breadcrumbs } = useLayoutActions();
  const location = useLocation();
  const paths =
    breadcrumbs == null
      ? []
      : Array.isArray(breadcrumbs)
      ? breadcrumbs
      : typeof breadcrumbs === 'string'
      ? [{ title: breadcrumbs }]
      : [breadcrumbs];
  const checkManualPaths = (
    manualPaths: BreadcrumbPathProps | BreadcrumbPathProps[],
    currentPath: string,
    sections: DrawerSectionProps[]
  ) => {
    if (manualPaths == null) return findPath(location.pathname, sections);
    else if (Array.isArray(manualPaths)) return manualPaths;
    //if (typeof manualPaths === 'BreadcrumbPathProps') {
    else {
      const paths = findPath(location.pathname, sections);
      if (paths.length > 0) paths[paths.length - 1] = breadcrumbs as BreadcrumbPathProps;
      return paths;
    }
  };
  /*
  const paths = useMemo(
    () => checkManualPaths(breadcrumbs, location.pathname, sections),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sections, breadcrumbs, location.pathname]
  );*/
  useEffect(() => {
    setDrawerVisibility(!isMiniScreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMiniScreen]);

  // set media wise responsive drawer
  useEffect(() => {
    setBreacrumbsHook(checkManualPaths(breadcrumbs, location.pathname, sections));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, breadcrumbs, location.pathname]);

  /*
  useEffect(() => {
    console.log('setBreacrumbsHook', paths);
    if (paths.length > 0 && breadcrumbs != null) {
      setBreacrumbsHook(paths[paths.length - 1].title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths]);*/

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
