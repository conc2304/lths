import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth-api';
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
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, _) => {
      state.token = null;
      state.userId = null;
      state.authenticated = false;
    });
  },
});

export const { setToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
