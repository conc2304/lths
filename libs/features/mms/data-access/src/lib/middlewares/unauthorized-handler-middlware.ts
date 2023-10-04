import { Middleware, MiddlewareAPI, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';

import { authActions } from '@lths/shared/data-access';

export const unauthorizedHandlerMiddleware: Middleware =
  (api: MiddlewareAPI) =>
  (next) =>
  (
    action: PayloadAction<{
      data: { error: { message: string; statusCode?: string | number }; status: string | number; message: string };
    }>
  ) => {
    if (isRejectedWithValue(action)) {
      if (action.payload?.data) {
        const { error, status, message } = action.payload.data;

        const statusCode = Number(error?.statusCode || status);

        // if any call returns unauthorized of forbidden + auth token error message : then the user needs to log back in
        if (statusCode === 401 || (statusCode === 403 && ['ERR_JWT_EXPIRED', 'ERR_JWT_INVALID'].includes(message))) {
          // logging a user out will automatically trigger a redirect to the login page
          api.dispatch(authActions.logout());
        }
      }
    }
    return next(action);
  };
