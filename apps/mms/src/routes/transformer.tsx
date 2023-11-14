import { lazy } from 'react';

import { DrawerSectionProps, LazyLoader } from '@lths/shared/ui-layouts';

import { PageLoader } from './loader';
import { SectionItemProps } from './types';
import { NotFound } from '../pages';

export type RouteConfig = {
  path: string;
  element: JSX.Element;
};

//for react router, item.path should be unique
export const generateRouteConfig = (pages: DrawerSectionProps[]): RouteConfig[] => {
  const routeConfigs: RouteConfig[] = [];
  //home page
  const HomePage = LazyLoader(lazy(() => import('../pages/home/index')));
  routeConfigs.push({ path: '/', element: <HomePage /> });

  //dynamic partial imports
  pages.forEach((item) => {
    if (item.items != null) flattenRouteConfig(item.items, false, routeConfigs);
  });

  //all the hard-coded or fall back routes goes here
  routeConfigs.push({ path: '*', element: <NotFound /> });

  return routeConfigs;
};

const flattenRouteConfig = (
  pages: SectionItemProps[],
  substituteFileIfMissing: boolean,
  routeConfigs: RouteConfig[] = []
): RouteConfig[] => {
  pages.forEach((item) => {
    const { path, file, items } = item;

    if (items) {
      flattenRouteConfig(item.items, substituteFileIfMissing, routeConfigs);
    }
    if ((substituteFileIfMissing || file) && path && !routeConfigs.some((rc) => rc.path === path)) {
      const url = file || `${path}-page`;
      const ELement = () => <PageLoader path={url} />;

      //const ELement = import(`../pages${path}`);
      const routeConfig: RouteConfig = {
        path,
        element: <ELement />,
      };
      routeConfigs.push(routeConfig);
    }
  });

  console.log({ routeConfigs });
  return routeConfigs;
};
