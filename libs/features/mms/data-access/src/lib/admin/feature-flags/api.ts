import { api } from '@lths/shared/data-access';
import { FeatureFlag } from '@lths/shared/ui-admin';

import { getFeatureFlagsUrl, updateFeatureFlagsUrl } from './urls';
import { ApiResponse, EnumGroupResponseData, EnumRequestPayload } from '../../types';

const FT_FLAG_TAG = 'FEATURE_FLAGS';

export const featureFlagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureFlags: builder.query<EnumGroupResponseData<FeatureFlag>, void>({
      query: () => ({
        url: getFeatureFlagsUrl(),
        method: 'GET',
      }),
      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      providesTags: () => {
        return [FT_FLAG_TAG];
      },
      transformResponse(response: ApiResponse<EnumGroupResponseData<FeatureFlag>>) {
        const featureFlagData = response?.data;

        return featureFlagData;
      },
    }),

    updateFeatureFlags: builder.mutation<ApiResponse<EnumGroupResponseData<string>>, UpdateMutationArgs>({
      query: ({ id, body }) => ({
        url: updateFeatureFlagsUrl(id),
        method: 'PATCH',
        body,
      }),
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: () => {
        return [FT_FLAG_TAG];
      },
    }),
  }),
});

type UpdateMutationArgs = {
  id: string;
  body: EnumRequestPayload<FeatureFlag>;
};

export const { useLazyGetFeatureFlagsQuery, useUpdateFeatureFlagsMutation } = featureFlagsApi;
