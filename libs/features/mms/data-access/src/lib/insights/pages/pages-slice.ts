import { createSlice } from '@reduxjs/toolkit';

import { insightPagesApi } from './pages-api';
import { PagesItem } from '../types';

const initialState = {} as PagesItem;
const insightPagesSlice = createSlice({
  name: 'insight-pages',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(insightPagesApi.endpoints.getInsightPages.matchFulfilled, (state, { payload }) => {
      state = payload.data;
    });
    builder.addMatcher(insightPagesApi.endpoints.getInsightPagesKpi.matchFulfilled, (state, { payload }) => {
      state.kpi = payload.data;
    });
  },
});

export const insightPagesReducer = insightPagesSlice.reducer;
