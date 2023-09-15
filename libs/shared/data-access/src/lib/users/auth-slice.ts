import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './auth-api';
import { AuthenticatedSession } from './types';
import { AUTH_TOKEN, AUTH_USER_ID } from '../core/constants';

const initialState: AuthenticatedSession = {
  token: localStorage.getItem(AUTH_TOKEN),
  userId: localStorage.getItem(AUTH_USER_ID),
  authenticated: !!localStorage.getItem(AUTH_TOKEN),
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const {
        accessToken,
        user: { _id },
      } = payload;
      localStorage.setItem(AUTH_TOKEN, accessToken);
      localStorage.setItem(AUTH_USER_ID, _id);
      state.token = accessToken;
      state.userId = _id;
      state.authenticated = true;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.token = null;
      state.userId = null;
      localStorage.setItem(AUTH_TOKEN, null);
      localStorage.setItem(AUTH_USER_ID, null);
      state.authenticated = false;
    });
  },
});

export const authReducer = authSlice.reducer;
