import { api } from '../core/api';
import { AUTH_LOGIN_URL, AUTH_LOGOUT_URL } from './urls';
import { LoginRequest, LoginResponse, LogoutResponse } from './types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => {
        return {
          url: AUTH_LOGIN_URL,
          method: 'POST',
          body: credentials,
        };
      },
    }),
    logout: builder.mutation<LogoutResponse, string>({
      query: (userId: string) => ({
        url: AUTH_LOGOUT_URL,
        method: 'POST',
        body: { id: userId },
      }),
    }),
  }),
});

export const { useLoginMutation,useLogoutMutation } = authApi;
