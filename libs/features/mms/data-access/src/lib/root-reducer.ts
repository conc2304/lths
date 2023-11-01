import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import { api, authReducer, userReducer } from '@lths/shared/data-access';

import { filtersReducer } from './filters/slice';
import { insightOverviewReducer } from './insights/overview-slice';
import { insightPagesReducer } from './insights/pages/pages-slice';
import { pagesDataReducer } from './pages/slice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  users: persistReducer({ key: 'users', storage: storageSession, whitelist: ['user'] }, userReducer),
  pagesData: pagesDataReducer,
  insights: insightOverviewReducer,
  pages: insightPagesReducer,
  filters: filtersReducer,
});
export default rootReducer;
