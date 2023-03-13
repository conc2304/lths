import { api } from '../core/api';
import { UserResponse } from './types';

export const userApi = api
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUser: builder.query<UserResponse, string>({
        query: (userId: string) => ({
          url: `/models/users/${userId}/service/ports/getUserById`,
          method: 'GET',
        }),

        //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
        invalidatesTags: ['User'],
      }),
    }),
  });

export const { useLazyGetUserQuery, useGetUserQuery } = userApi;
