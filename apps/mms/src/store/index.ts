import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { api,authReducer } from "@lths/shared/data-access";
//import {Todo} from 'lths-data-access-models';
import rootReducer from './root-reducer';
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),//.concat(rtkQueryErrorLogger),
  devTools: process.env.NODE_ENV !== "production",
});


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;