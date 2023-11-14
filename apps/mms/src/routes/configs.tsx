import { lazy } from 'react';
import { Navigate, RouteObject, redirect } from 'react-router-dom';

import { LazyLoader } from '@lths/shared/ui-layouts';

import { PrivateLayout, PublicLayout } from './layouts';
import { generateRouteConfig } from './transformer';
import pages from '../pages/paths';

// eslint-disable-next-line @nx/enforce-module-boundaries
const LoginPage = LazyLoader(lazy(() => import('libs/shared/ui-login/src/lib/login')));
// eslint-disable-next-line @nx/enforce-module-boundaries
const ForgotPasswordPage = LazyLoader(lazy(() => import('libs/shared/ui-login/src/lib/forgot-password')));
// eslint-disable-next-line @nx/enforce-module-boundaries
const ResetPasswordPage = LazyLoader(lazy(() => import('libs/shared/ui-login/src/lib/reset-password')));
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const AuthenticationRoutes = (authenticated: boolean): RouteObject => {
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
    ],
  };
};

export const DashRoutes = (authenticated: boolean): RouteObject => {
  const children = generateRouteConfig(pages);

  return {
    path: '/',
    element: PrivateLayout,
    loader: () => {
      return authenticated ? null : redirect('/login');
    },
    children,
  };
};
