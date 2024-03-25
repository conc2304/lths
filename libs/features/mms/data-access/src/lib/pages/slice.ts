import { createSlice } from '@reduxjs/toolkit';

import api from './api';
import { PageItemsResponse } from './types';
import { getCopiedComponentFromStorage, removeCopiedComponentFromStorage, saveCopiedComponentToStorage } from './utils';

const initialState = {
  pages: {} as PageItemsResponse,
  clipboard: { component: getCopiedComponentFromStorage() } as Record<string, any>,
};
const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    copyComponentToClipboard(state, action) {
      state.clipboard.component = action.payload;
      saveCopiedComponentToStorage(action.payload);
    },
    removeComponentFromClipboard(state) {
      state.clipboard.component = null;
      removeCopiedComponentFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getPagesItems.matchFulfilled, (state, { payload }) => {
      state.pages = payload;
    });
  },
});

export const pagesDataReducer = pagesSlice.reducer;
export const { copyComponentToClipboard, removeComponentFromClipboard } = pagesSlice.actions;
