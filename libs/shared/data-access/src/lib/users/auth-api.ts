import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from './types';
import { AUTH_LOGIN_URL, AUTH_LOGOUT_URL, AUTH_FORGOT_PASSWORD_URL, AUTH_RESET_PASSWORD_URL } from './urls';
import { api } from '../core/api';

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
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (credentials) => {
        return {
          url: AUTH_FORGOT_PASSWORD_URL,
          method: 'POST',
          body: credentials,
        };
      },
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (credentials) => {
        return {
          url: AUTH_RESET_PASSWORD_URL,
          method: 'POST',
          body: credentials,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
