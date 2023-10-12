import { createSlice } from '@reduxjs/toolkit';

import { assetsApi } from './api';
import { AssetListResponse, Asset } from './types';

type AssetsState = {
  assets: AssetListResponse;
  newAsset: Asset | null;
};

const initialState: AssetsState = { assets: { data: [], meta: { page: 0, page_size: 0, total: 0 } }, newAsset: null };

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(assetsApi.endpoints.getAssetsItems.matchFulfilled, (state, { payload }) => {
      state.assets = payload;
    });
    builder.addMatcher(assetsApi.endpoints.addResource.matchFulfilled, (state, { payload }) => {
      state.newAsset = payload;
      state.assets.data.push(payload);
    });
    builder.addMatcher(assetsApi.endpoints.searchAssets.matchFulfilled, (state, { payload }) => {
      state.assets = payload;
    });
    builder.addMatcher(assetsApi.endpoints.editResource.matchFulfilled, (state, { payload }) => {
      const assetIndex = state.assets.data.findIndex((asset) => asset._id === payload._id);
      if (assetIndex !== -1) {
        state.assets.data[assetIndex] = payload;
      }
    });
    builder.addMatcher(assetsApi.endpoints.deleteResource.matchFulfilled, (state, { payload }) => {
      state.assets.data = state.assets.data.filter((asset) => asset._id !== payload._id);
    });
  },
});

export const assetsReducer = assetsSlice.reducer;
