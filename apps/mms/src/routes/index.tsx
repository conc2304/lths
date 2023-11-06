import { RouterProvider, createHashRouter } from 'react-router-dom';

import { useAppSelector } from '@lths/features/mms/data-access';

import { DashRoutes, AuthenticationRoutes } from './configs';

export default function Routes() {
  const auth = useAppSelector((state) => state.auth);
  const { authenticated } = auth;
  const routes = [DashRoutes(authenticated), AuthenticationRoutes(authenticated)];
  const hashRoutes = createHashRouter(routes);

  return <RouterProvider router={hashRoutes} />;
}
