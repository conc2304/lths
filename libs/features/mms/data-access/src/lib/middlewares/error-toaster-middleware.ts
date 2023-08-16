import { isRejectedWithValue } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorToasterMiddleware = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from RTK under the hood, so we can use these to match the action creators!
  if (isRejectedWithValue(action)) {
    let msg = 'Something went wrong. Please try logging in again.';

    if (action.payload?.data) {
      const { error, status, message } = action.payload.data;
      const statusCode = error?.statusCode || status;
      switch (statusCode) {
        case 400:
          msg = `Bad Request: ${message}`;
          break;
        case 401:
          msg = `Unauthorized: ${message}`;
          break;
        case 403:
          msg = `Forbidden: ${message}`;
          break;
        case 404:
          msg = `Not Found: ${message}`;
          break;
        case 500:
          msg = `Server Error: ${message}`;
          break;
        default:
          msg = message || msg;
          break;
      }
    }

    toast.error(msg);
    console.warn('ERROR', msg, action);
  }
  return next(action);
};
