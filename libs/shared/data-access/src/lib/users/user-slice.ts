import { createSlice } from '@reduxjs/toolkit';
import { userApi } from './user-api';
import { User } from './types';

const initialState = { user: <User>{} };
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
