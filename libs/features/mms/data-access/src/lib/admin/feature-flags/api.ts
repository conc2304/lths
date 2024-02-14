import { api } from '@lths/shared/data-access';
import { FeatureFlag } from '@lths/shared/ui-admin';

import { getFeatureFlagsUrl } from './urls';
import { ApiResponse, EnumGroupResponseData } from '../../types';

const FT_FLAG_TAG = 'FT_FLAGS';

export const featureFlagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureFlags: builder.query<FeatureFlag[], void>({
      query: () => ({
        url: getFeatureFlagsUrl(),
        method: 'GET',
      }),
      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      providesTags: () => {
        return [FT_FLAG_TAG];
      },
      transformResponse(response: ApiResponse<EnumGroupResponseData<FeatureFlag>>) {
        // we stuff all required data as a JSON string inside the value object
        // and we store the module name, title, and app in the enum name
        const featureFlagData = response?.data?.enum_values ?? null;

        console.log('api', { featureFlagData });

        return featureFlagData ? featureFlagData.map((f) => f.value) : [];
      },
    }),

    updateFeatureFlags: builder.mutation<ApiResponse<EnumGroupResponseData<string>>, FeatureFlag[]>({
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
