import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

import { toastQueueService } from '@lths/shared/ui-elements';
import { hashString } from '@lths/shared/utils';

export const errorToasterMiddleware: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from RTK under the hood, so we can use these to match the action creators!
  if (isRejectedWithValue(action)) {
    let msg: JSX.Element | string | null = 'Something went wrong. Please try logging in again.';

    // using the same 'id' prevents duplicate errors that it won't stack, leaving 'id' undefined means it will stack
    let id: string | undefined = 'uknown';

    if (action.payload?.data) {
      const { error, status, message } = action.payload.data;
      const statusCode = error?.statusCode || status;
      switch (statusCode) {
        case 400:
          msg = `Bad Request: ${message}`;
          id = undefined;
          break;
        case 401:
          msg = `Unauthorized: ${message}`;
          id = 'unauthorized';
          break;
        case 403:
          msg = `Forbidden: ${message}`;
          id = 'forbidden';
          break;
        case 404:
          msg = `Not Found: ${message}`;
          id = undefined;
          break;
        case 500:
          msg = `Server Error: ${message}`;
          id = 'serverError';
          break;
        default:
          msg = message || msg;
          id = undefined;
          break;
      }
    } else if (action.payload?.error) {
      msg = action.payload.error;
      id = action.payload.status;
    }

    // hashing the message to a number to add to id to create unique but reproducable id + msg string combinations
    // this allows us to dedupe errors of the same type AND same message and not just the same type
    id = id ? `${id}_${hashString(msg.toString())}` : undefined;

    toastQueueService.addToastToQueue(msg, { id, type: 'important' });
    console.warn('ERROR : ', msg, ` id: ${id}`, action);
  }
  return next(action);
};
