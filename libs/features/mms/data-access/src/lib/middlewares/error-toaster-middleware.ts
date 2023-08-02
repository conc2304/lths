import { isRejectedWithValue } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const errorToasterMiddleware = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from RTK under the hood, so we can use these to match the action creators!
  if (isRejectedWithValue(action)) {
    const error = action.payload?.data?.error
      ? action.payload?.data?.message
      : 'Something went wrong. Please try logging in again.';
    toast.error(error);
    console.warn('ERROR', action);
  }
  return next(action);
};
