import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { authApi } from './auth-api';
import { AuthenticatedSession } from './types';
import { removeAuthTokenFromStorage, setAuthTokenFromStorage, getAuthSessionFromStorage } from './utils';

const initialState = getAuthSessionFromStorage();

const handleLogout = (state: AuthenticatedSession) => {
  state.token = null;
  state.userId = null;
  removeAuthTokenFromStorage();
  state.authenticated = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: typeof initialState) => {
      handleLogout(state);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const {
        accessToken,
        user: { _id },
      } = payload;
      setAuthTokenFromStorage(accessToken, _id);

      state.token = accessToken;
      state.userId = _id;
      state.authenticated = true;
    });
    builder.addMatcher(
      isAnyOf(authApi.endpoints.logout.matchFulfilled, authApi.endpoints.logout.matchRejected),
      (state) => {
        handleLogout(state);
      }
    );
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
