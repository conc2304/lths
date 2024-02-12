import { api } from '@lths/shared/data-access';
import { FeatureFlag } from '@lths/shared/ui-admin';

import { getFeatureFlagsUrl } from './urls';
import { ApiResponse, EnumGroupResponseData } from '../../types';

const FT_FLAG_TAG = 'FT_FLAGS';

export const featureFlagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureFlags: builder.query<ApiResponse<EnumGroupResponseData<FeatureFlag>>, void>({
      query: () => ({
        url: getFeatureFlagsUrl(),
        method: 'GET',
      }),
      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      providesTags: () => {
        return [FT_FLAG_TAG];
      },
    }),
    updateFeatureFlags: builder.mutation<ApiResponse<EnumGroupResponseData<FeatureFlag>>, FeatureFlag[]>({
      query: (payload) => ({
        url: getFeatureFlagsUrl(),
        method: 'PATCH',
        body: payload,
      }),
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: () => {
        return [FT_FLAG_TAG];
      },
    }),
  }),
});

export const { useLazyGetFeatureFlagsQuery, useUpdateFeatureFlagsMutation } = featureFlagsApi;
