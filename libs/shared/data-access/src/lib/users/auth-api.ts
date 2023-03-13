import { api } from '../core/api';
import { LoginRequest, LoginResponse } from './types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => {
        return {
          url: '/models/users/service/ports/login',
          method: 'POST',
          body: credentials,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
