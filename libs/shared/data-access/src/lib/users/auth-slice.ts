import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth-api';
import { api } from '../core/api';
import { AuthenticatedSession } from './types';

const addToken = (state, action) => {
  state.users = action.payload;
};

const initialState: AuthenticatedSession = {
  token: null,
  userId: null,
  authenticated: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: addToken,
  },

  extraReducers: (builder) => {
    console.log(builder);
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      // api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log('extraReducers', payload);

        state.token = payload.token;
        state.userId = payload.user_id;
        state.authenticated = true;
      }
    );
  },
});

export const { setToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
