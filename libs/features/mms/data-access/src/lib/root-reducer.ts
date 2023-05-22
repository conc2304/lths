import { combineReducers } from '@reduxjs/toolkit';
import { filtersReducer } from 'libs/features/mms/data-access/src/lib/filters/slice';

import { api, authReducer, userReducer } from '@lths/shared/data-access';

import { insightOverviewReducer } from './insights/overview-slice';
import { insightPagesReducer } from './insights/pages/pages-slice';
import { pagesDataReducer } from './pages/pages-slice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  users: userReducer,
  pagesData: pagesDataReducer,
  insights: insightOverviewReducer,
  pages: insightPagesReducer,
  filters: filtersReducer,
});
export default rootReducer;
