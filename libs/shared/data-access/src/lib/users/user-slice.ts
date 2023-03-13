import { createSlice } from '@reduxjs/toolkit';
import { userApi } from './user-api';
import { UserResponse } from './types';

const initialState = { user: <UserResponse>{} };
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
