import { Middleware, MiddlewareAPI, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';

import { authActions } from '@lths/shared/data-access';

export const JWT_EXPIRED_MSG = 'ERR_JWT_EXPIRED';
export const JWT_INVALID_MSG = 'ERR_JWT_INVALID';
export const INVALID_JWT_MSGS = [JWT_EXPIRED_MSG, JWT_INVALID_MSG];

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
        if (statusCode === 401 || (statusCode === 403 && INVALID_JWT_MSGS.includes(message))) {
          // logging a user out will automatically trigger a redirect to the login page
          api.dispatch(authActions.logout());
        }
      }
    }
    return next(action);
  };
