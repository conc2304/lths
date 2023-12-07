import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AUTH_TOKEN, HOST_API } from './constants';
import rootReducer from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

const baseQuery = fetchBaseQuery({
  baseUrl: HOST_API,
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('x-api-key', process.env.NX_PUBLIC_API_KEY);
    headers.set('x-api-version', '2');

    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
