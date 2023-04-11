import { api, authReducer, userReducer } from '@lths/shared/data-access';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  users: userReducer,
});
export default rootReducer;
