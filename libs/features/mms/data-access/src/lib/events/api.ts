import { api } from '@lths/shared/data-access';

import { getEventsResponseTransformer } from './response-transformer';
import {
  CreateEventPayload,
  CreateEventResponse,
  GetEventsEvent,
  TransormedGetEventsResponse,
  UpdateEventArgs,
  UpdateEventResponse,
} from './types';
import { createEventUrl, getEventsUrl, updateEventUrl } from './urls';
import { QueryParams } from '../../types';
import { ApiResponse } from '../types';

const EVENTS_TAG = 'EVENTS';
const VIRTUAL_ID = 'EVENTS_CACHE';

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<TransormedGetEventsResponse, QueryParams | undefined>({
      query: (params = undefined) => ({
        url: getEventsUrl(),
        method: 'GET',
        params: params,
      }),
      // Provides a list of `Events` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags,
      // this query will re-run to be always up-to-date.
      // The `VIRTUAL_ID` id is a "virtual id" that is made up to be able
      // to invalidate this query specifically if a new `Events` element was added

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      providesTags: (responseData) => {
        // an error occurred, but we still want to refetch this query when `{ type: 'EVENTS_TAG', id: 'VIRTUAL_ID' }` is invalidated
        const onErrorTags = [{ type: EVENTS_TAG, id: VIRTUAL_ID }];

        if (!responseData) return onErrorTags;

        const { events, eventStates } = responseData;
        return events && eventStates
          ? [
              ...events.map(({ eventId }) => ({ type: EVENTS_TAG, id: eventId } as const)),
              ...eventStates.map(({ eventId }) => ({ type: EVENTS_TAG, id: eventId } as const)),
              { type: EVENTS_TAG, id: VIRTUAL_ID },
            ]
          : onErrorTags;
      },
      transformResponse: (response: ApiResponse<GetEventsEvent[]>): TransormedGetEventsResponse => {
        return getEventsResponseTransformer(response);
      },
    }),
    createEvent: builder.mutation<CreateEventResponse, CreateEventPayload>({
      query: (eventValues) => ({
        url: createEventUrl(),
        method: 'POST',
        body: eventValues,
      }),
      // Invalidates all EVENT-type queries providing the `VIRTUAL_ID` id
      // depending of the sort order,
      // that newly created EVENT could show up in any lists.
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: [{ type: EVENTS_TAG, id: VIRTUAL_ID }],
    }),
    updateEvent: builder.mutation<UpdateEventResponse, UpdateEventArgs>({
      query: ({ id, payload }) => ({
        url: updateEventUrl(id),
        method: 'PATCH',
        body: payload,
      }),
      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      // Invalidates all queries that subscribe to this EVENT `id` only.
      // `getEvents` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { payload: { event_id } }) => {
        if (!event_id) return;
        return [{ type: EVENTS_TAG, id: event_id }];
      },
    }),
  }),
});

export const { useLazyGetEventsQuery, useUpdateEventMutation, useCreateEventMutation } = eventsApi;
