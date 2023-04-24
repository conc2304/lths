import { createSlice } from '@reduxjs/toolkit';

import { insightOverviewApi } from './overview-api';
import { InsightItem } from './types';

const initialState = {} as InsightItem;
const insightOverviewSlice = createSlice({
  name: 'insight-overview',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(insightOverviewApi.endpoints.getInsightOverview.matchFulfilled, (state, { payload }) => {
      state = payload.data;
    });
    builder.addMatcher(insightOverviewApi.endpoints.getInsightOverviewKpi.matchFulfilled, (state, { payload }) => {
      state.kpi = payload.data;
    });
  },
});

export const insightOverviewReducer = insightOverviewSlice.reducer;
