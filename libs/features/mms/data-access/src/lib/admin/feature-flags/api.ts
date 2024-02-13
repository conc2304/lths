import { api } from '@lths/shared/data-access';
import { FeatureFlag, parseFlagId } from '@lths/shared/ui-admin';
import { deslugify } from '@lths/shared/utils';

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
      transformResponse(response: ApiResponse<EnumGroupResponseData<string>>) {
        // we stuff all required data as a JSON string inside the value object
        // and we store the module name, title, and app in the enum name
        const enum_values = response?.data?.enum_values ?? null;

        if (!enum_values) return [];

        // and we return something sane that we can actuall use in the apps
        const data = enum_values.map((f) => {
          const { title, module } = parseFlagId(f.name);
          const { enabled, description } = JSON.parse(f.value);
          return {
            module,
            title: deslugify(title).toUpperCase(),
            description,
            enabled,
            id: f.name,
          };
        });

        return data;
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

export const {
  useLazyGetFeatureFlagsQuery,
  // useGetFeatureFlagsDescriptionQuery,
  useUpdateFeatureFlagsMutation,
  // useUpdateFeatureFlagsDescriptionMutation,
} = featureFlagsApi;
