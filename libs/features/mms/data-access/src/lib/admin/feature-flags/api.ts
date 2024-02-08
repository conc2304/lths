import { api } from '@lths/shared/data-access';
import { FeatureFlag } from '@lths/shared/ui-admin';

import { getFeatureFlagsUrl } from './urls';
import { ApiResponse } from '../../types';

const FT_FLAG_TAG = 'FT_FLAGS';
const VIRTUAL_ID = 'FT_FLAGS_CACHE';

export const featureFlagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureFlags: builder.query<ApiResponse<FeatureFlag[]>, void>({
      query: () => ({
        url: getFeatureFlagsUrl(),
        method: 'GET',
      }),
      // Provides a list of `Feature Flags` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags,
      // this query will re-run to be always up-to-date.
      // The `VIRTUAL_ID` id is a "virtual id" that is made up to be able
      // to invalidate this query specifically if a new `Flags` element was added

      // @ts-expect-error: type definition doesn't reflect with injectEndpoints method
      providesTags: () => {
        return [{ type: FT_FLAG_TAG, id: VIRTUAL_ID }];
      },
    }),
    createFeatureFlag: builder.mutation<ApiResponse<FeatureFlag[]>, FeatureFlag[]>({
      query: (payload) => ({
        url: getFeatureFlagsUrl(),
        method: 'POST',
        body: payload,
      }),
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: [{ type: FT_FLAG_TAG, id: VIRTUAL_ID }],
    }),
    updateFeatureFlags: builder.mutation<ApiResponse<FeatureFlag[]>, FeatureFlag[]>({
      query: (payload) => ({
        url: getFeatureFlagsUrl(),
        method: 'PATCH',
        body: payload,
      }),
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: () => {
        return [{ type: FT_FLAG_TAG, id: VIRTUAL_ID }];
      },
    }),
  }),
});

export const { useLazyGetFeatureFlagsQuery, useCreateFeatureFlagMutation, useUpdateFeatureFlagsMutation } =
  featureFlagsApi;
