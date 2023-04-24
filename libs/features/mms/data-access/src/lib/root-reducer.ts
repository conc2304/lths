import { api, authReducer, userReducer } from '@lths/shared/data-access';
import { combineReducers } from '@reduxjs/toolkit';

import { insightOverviewReducer } from './insights/overview-slice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  users: userReducer,
  insights: insightOverviewReducer,
});
export default rootReducer;
