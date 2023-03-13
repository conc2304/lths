import { combineReducers } from '@reduxjs/toolkit';
import { api, authReducer, userReducer } from '@lths/shared/data-access';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  users: userReducer,
});
export default rootReducer;
