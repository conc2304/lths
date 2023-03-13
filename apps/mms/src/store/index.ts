import { Action, configureStore, isRejectedWithValue, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { api } from "@lths/shared/data-access";

import rootReducer from './root-reducer';
import toast from "react-hot-toast";
export const rtkQueryErrorHandler = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const error =action.payload?.data?.error || 'Something went wrong. Please try logging in again.';
    toast.error(error);
    console.warn("ERROR", action);
  }
  return next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(rtkQueryErrorHandler),
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;