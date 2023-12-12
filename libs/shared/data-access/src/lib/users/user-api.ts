import { User, UserProfileData, UserResponse } from './types';
import { getAllUsersUrl, getAuthUserByIdUrl, updateUserByIdUrl } from './urls';
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
      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['Users'],
    }),

    updateUser: builder.mutation<UserResponse, { userId: string } & Partial<UserProfileData>>({
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
