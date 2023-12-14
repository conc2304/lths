import { api } from '@lths/shared/data-access';
import { UserRole } from '@lths/shared/ui-user-management';

import { readAllRolesUrl } from './urls';
import { ApiResponse, QueryParams } from '../types';

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<UserRole[], QueryParams | void>({
      query: (params = undefined) => ({
        url: readAllRolesUrl,
        method: 'GET',
        params: params || undefined,
      }),
      transformResponse: (response: ApiResponse<UserRole[]>) => {
        return response.data;
      },
    }),
  }),
});

export const { useLazyGetRolesQuery } = rolesApi;
