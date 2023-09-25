import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './auth-api';
import { removeAuthTokenFromStorage, setAuthTokenFromStorage, getAuthSessionFromStorage } from './utils';

const initialState = getAuthSessionFromStorage();

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
      setAuthTokenFromStorage(accessToken, _id);

      state.token = accessToken;
      state.userId = _id;
      state.authenticated = true;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.token = null;
      state.userId = null;
      removeAuthTokenFromStorage();
      state.authenticated = false;
    });
  },
});

export const authReducer = authSlice.reducer;
