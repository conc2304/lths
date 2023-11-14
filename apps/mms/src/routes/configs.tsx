import { lazy } from 'react';
import { Navigate, RouteObject, redirect } from 'react-router-dom';

import { LazyLoader } from '@lths/shared/ui-layouts';

import { PrivateLayout, PublicLayout } from './layouts';
import { generateRouteConfig } from './transformer';
import pages from '../pages/paths';

const LoginPage = LazyLoader(lazy(() => import('../pages/auth/login-page')));
const ForgotPasswordPage = LazyLoader(lazy(() => import('../pages/auth/forgot-password')));
const ResetPasswordPage = LazyLoader(lazy(() => import('../pages/auth/reset-password')));

export const AuthenticationRoutes = (authenticated: boolean): RouteObject => {
  return {
    path: '/',
    element: PublicLayout,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
          return authenticated ? redirect('/') : null;
        },
      },
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
    element: authenticated ? PrivateLayout : <Navigate to="/login" />,
    children,
  };
};
