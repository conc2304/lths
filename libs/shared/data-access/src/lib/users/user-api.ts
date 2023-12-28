import { UserProfileData, UserResponse } from './types';
import { getAuthUserByIdUrl, updateUserByIdUrl } from './urls';
import { api } from '../core/api';

export const userApi = api.enhanceEndpoints({ addTagTypes: ['User'] }).injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, string>({
      query: (userId: string) => ({
        url: getAuthUserByIdUrl(userId),
        method: 'GET',
      }),

      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<UserResponse, { userId: string } & Partial<UserProfileData>>({
      query: ({ userId, ...body }) => ({
        url: updateUserByIdUrl(userId),
        method: 'PUT',
        body,
      }),

      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLazyGetUserQuery, useGetUserQuery, useUpdateUserMutation } = userApi;
