import { createSlice } from '@reduxjs/toolkit';
import { userApi } from './user-api';
import { api } from '../core/api';
import { UserResponse } from './types';

const initialState = <UserResponse>{};
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        Object.keys(state).forEach((key) => {
          state[key] = payload[key];
        });
      }
    );
  },
});

export const userReducer = userSlice.reducer;
