import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_TOKEN, HOST_API } from './constants';
//import { RootState } from './types';
import rootReducer from './root-reducer';

type RootState = ReturnType<typeof rootReducer>;

const baseQuery = fetchBaseQuery({
  baseUrl: HOST_API,
  mode: process.env.NODE_ENV !== 'production' ? 'no-cors' : 'cors',
  prepareHeaders: (headers, { getState }) => {
    headers.set('Access-Control-Allow-Origin', '*');

    //const token = (getState() as RootState).auth.token;

    const token = localStorage.getItem(AUTH_TOKEN);
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
