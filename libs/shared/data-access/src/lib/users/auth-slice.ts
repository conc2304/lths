import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth-api';
import { AuthenticatedSession } from './types';
import { AUTH_TOKEN, AUTH_USER_ID } from '../core/constants';

const addToken = (state, action) => {
  state.users = action.payload;
};

const initialState: AuthenticatedSession = {
  token: localStorage.getItem(AUTH_TOKEN),
  userId: localStorage.getItem(AUTH_USER_ID),
  authenticated: !!localStorage.getItem(AUTH_TOKEN),
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: addToken,
  },

  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      console.log('extraReducers', payload);
      localStorage.setItem(AUTH_TOKEN, payload.token);
      localStorage.setItem(AUTH_USER_ID, payload.user_id);
      state.token = payload.token;
      state.userId = payload.user_id;
      state.authenticated = true;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, _) => {
      state.token = null;
      state.userId = null;
      localStorage.setItem(AUTH_TOKEN, null);
      localStorage.setItem(AUTH_USER_ID, null);
      state.authenticated = false;
    });
  },
});

export const { setToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
