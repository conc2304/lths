import { lazy } from "react";
import { LazyLoader,BasicLayout } from "@lths/shared/ui-layouts";
import { Navigate } from "react-router-dom";

import DashboardLayout from "./layout-drawer-links";
//import {LoginForm as LoginPage2} from '@lths/shared/ui-login';
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
//shown only during first load
const LazyPageTest = LazyLoader(
  lazy(() => {
    return new Promise((resolve) =>
      setTimeout(resolve, getRandomArbitrary(2000, 4000))
    ).then(() => import("../pages/sample-page"));
  })
);

const SamplePage = LazyLoader(lazy(() => import("../pages/sample-page")));

const ChartPage = LazyLoader(lazy(() => import("../pages/chart-page")));
const NotificationsPage = LazyLoader(lazy(() => import("../pages/insights/notifications-page")));

const DesignSystem = LazyLoader(lazy(() => import("../pages/design-system")))

//const LoginPage = LazyLoader(lazy(() => import("@lths/shared/ui-login/login")));
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const LoginPage2 = LazyLoader(lazy(() => import(  "libs/shared/ui-login/src/lib/login")));
const NotFound = LazyLoader(lazy(() => import("../pages/404")));

const PublicLayout = <BasicLayout />;

export const AuthenticationRoutes = (authenticated: boolean) => {
  return {
    path: "/",
    element: PublicLayout,
    children: [
      {
        path: "/login",
        element: <LoginPage2 />,
      },
      {
        path: "/design-system",
        element: <DesignSystem />,
      },
    ],
  };
};
export const DashRoutes = (authenticated: boolean) => {
  return {
    path: "/",
    element: authenticated ? DashboardLayout : <Navigate to="/login" />,
    //element: DashboardLayout,
    children: [
      {
        path: "/",
        element: <SamplePage />,
      },
      {
        path: "/emails/draft",
        element: <LazyPageTest />,
      },
      {
        path: "/emails/starred",
        element: <SamplePage />,
      },

      {
        path: "/dashboard/charts",
        element: <ChartPage />,
      },
      {
        path: "/Insights/Notifications",
        element: <NotificationsPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  };
};
