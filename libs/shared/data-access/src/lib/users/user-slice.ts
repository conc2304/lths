import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { authApi } from './auth-api';
import { User } from './types';
import { userApi } from './user-api';

const initialState = { user: {} as User };
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.user = payload.data;
    });
    builder.addMatcher(
      isAnyOf(authApi.endpoints.logout.matchFulfilled, authApi.endpoints.logout.matchRejected),
      (state) => {
        state.user = {} as User;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
