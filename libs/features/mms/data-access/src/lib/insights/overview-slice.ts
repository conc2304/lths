import { createSlice } from '@reduxjs/toolkit';

import { insightOverviewApi } from './overview-api';
import { InsightResponse } from './types';

const initialState = { data: {} as InsightResponse };
const insightOverviewSlice = createSlice({
  name: 'insight-overview',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(insightOverviewApi.endpoints.getInsightOverview.matchFulfilled, (state, { payload }) => {
      state.data = payload;
    });
  },
});

export const insightOverviewReducer = insightOverviewSlice.reducer;
