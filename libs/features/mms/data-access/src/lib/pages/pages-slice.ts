import { createSlice } from '@reduxjs/toolkit';

import { pagesApi } from './pages-api';
import { PagesDataResponse } from './types';

const initialState = { pages: {} as PagesDataResponse };
const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(pagesApi.endpoints.getPagesItems.matchFulfilled, (state, { payload }) => {
      state.pages = payload;
    });
  },
});

export const pagesDataReducer = pagesSlice.reducer;
