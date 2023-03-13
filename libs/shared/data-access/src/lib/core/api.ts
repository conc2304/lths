import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST_API } from './constants';
//import { RootState } from './types';
import rootReducer from './root-reducer';

type RootState = ReturnType<typeof rootReducer>;

const baseQuery = fetchBaseQuery({
  baseUrl: HOST_API,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Access-Control-Allow-Origin', '*');

    const token = (getState() as RootState).auth.token;
    console.log('token', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
