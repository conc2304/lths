import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import { LazyLoader } from '@lths/shared/ui-layouts';

import { PrivateLayout, PublicLayout } from './layouts';
import { generateRouteConfig } from './transformer';
import pages from '../pages/paths';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const LoginPage = LazyLoader(lazy(() => import('libs/shared/ui-login/src/lib/login')));
const PubliApiTestPage = LazyLoader(lazy(() => import('../pages/demo/public-page')));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AuthenticationRoutes = (authenticated: boolean) => {
  return {
    path: '/',
    element: PublicLayout,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/public-api-test',
        element: <PubliApiTestPage />,
      },
    ],
  };
};

export const DashRoutes = (authenticated: boolean) => {
  const children = generateRouteConfig(pages);

  return {
    path: '/',
    element: authenticated ? PrivateLayout : <Navigate to="/login" />,
    children,
  };
};
