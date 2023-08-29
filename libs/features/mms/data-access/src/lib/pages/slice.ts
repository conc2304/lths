import { createSlice } from '@reduxjs/toolkit';

import api from './api';
import { PageItemsResponse } from './types';

const initialState = { pages: {} as PageItemsResponse };
const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getPagesItems.matchFulfilled, (state, { payload }) => {
      state.pages = payload;
    });
  },
});

export const pagesDataReducer = pagesSlice.reducer;
