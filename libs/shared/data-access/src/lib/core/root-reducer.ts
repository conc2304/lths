import { combineReducers } from '@reduxjs/toolkit';

import { api } from './api';
import { authReducer } from '../users/auth-slice';
import { userReducer } from '../users/user-slice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  users: userReducer,
});
export default rootReducer;
