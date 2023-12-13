import { User, UserResponse } from './types';
import { createUserUrl, getAllUsersUrl, getAuthUserByIdUrl, updateUserByIdUrl } from './urls';
import { api } from '../core/api';
import { QueryParams, ApiResponse } from '../types';

export const userApi = api.enhanceEndpoints({ addTagTypes: ['User', 'Users'] }).injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, string>({
      query: (userId: string) => ({
        url: getAuthUserByIdUrl(userId),
        method: 'GET',
      }),

      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['User'],
    }),

    getUsers: builder.query<ApiResponse<User[]>, QueryParams | void>({
      query: (params) => ({
        url: getAllUsersUrl,
        method: 'GET',
        params: params || undefined,
      }),
    }),

    createUser: builder.mutation<UserResponse, Partial<User>>({
      query: (body) => ({
        url: createUserUrl,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),

    updateUser: builder.mutation<UserResponse, { userId: string } & Partial<User>>({
      query: ({ userId, ...body }) => ({
        url: updateUserByIdUrl(userId),
        method: 'PUT',
        body,
      }),

      invalidatesTags: ['User', 'Users'],
    }),
  }),
});

export const { useLazyGetUserQuery, useGetUserQuery, useUpdateUserMutation, useLazyGetUsersQuery } = userApi;
