import { createSlice } from '@reduxjs/toolkit';

import { userApi } from './api';
import { NotificationResponse } from './types';

const initialState = { notifications: {} as NotificationResponse };
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getNotificationItems.matchFulfilled, (state, { payload }) => {
      state.notifications = payload;
    });
  },
});

export const notificationReducer = notificationSlice.reducer;
