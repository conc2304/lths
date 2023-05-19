import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import { LazyLoader } from '@lths/shared/ui-layouts';

import { PrivateLayout, PublicLayout } from './layouts';
import { generateRouteConfig } from './transformer';
import pages from '../pages/paths';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const LoginPage = LazyLoader(lazy(() => import('libs/shared/ui-login/src/lib/login')));
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const ForgotPasswordPage = LazyLoader(lazy(() => import('libs/shared/ui-forgot-password/src/lib/forgot-password')));
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const ResetPasswordPage = LazyLoader(lazy(() => import('libs/shared/ui-reset-password/src/lib/reset-password')));
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
      // ToDO dose this do anything
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password/:resetToken?',
        element: <ResetPasswordPage />,
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
