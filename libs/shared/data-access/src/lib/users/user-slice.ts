import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const userReducer = userSlice.reducer;
