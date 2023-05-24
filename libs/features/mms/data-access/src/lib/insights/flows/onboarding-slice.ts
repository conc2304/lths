import { createSlice } from '@reduxjs/toolkit';

import { insightOnboardingApi } from './onboarding-api';
import { InsightItem } from '../types';

const initialState = {} as InsightItem;
const insightOnboardingSlice = createSlice({
  name: 'insight-onboarding',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(insightOnboardingApi.endpoints.getInsightOnboarding.matchFulfilled, (state, { payload }) => {
      state = payload.data;
    });
    builder.addMatcher(insightOnboardingApi.endpoints.getInsightOnboardingKpi.matchFulfilled, (state, { payload }) => {
      state.kpi = payload.data;
    });
  },
});

export const insightOnboardingReducer = insightOnboardingSlice.reducer;
