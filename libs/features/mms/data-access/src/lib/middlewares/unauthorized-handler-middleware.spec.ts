import configureStore from 'redux-mock-store';
import 'whatwg-fetch'; // removes the warning/error for SSR fetching

import { authActions } from '@lths/shared/data-access';

import { JWT_INVALID_MSG, JWT_EXPIRED_MSG, unauthorizedHandlerMiddleware } from './unauthorized-handler-middlware';

const initialState = {};
const middlewares = [unauthorizedHandlerMiddleware];
const mockStore = configureStore(middlewares);

const logoutAction = { type: authActions.logout.type };

describe('unauthorizedHandlerMiddleware', () => {
  const mockRejectedAction = (status = 403, message = '') => ({
    type: 'api/executeQuery/rejected',
    payload: {
      status: status,
      data: {
        success: false,
        message: message,
        error: {
          statusCode: status,
          type: 'ForbiddenException',
          timestamp: '2023-10-04T18:20:59.943Z',
          path: '/api/enums/EventType',
        },
      },
    },
    meta: {
      baseQueryMeta: { request: {}, response: {} },
      RTK_autoBatch: true,
      arg: {
        type: 'query',
        subscribe: true,
        forceRefetch: true,
        subscriptionOptions: { pollingInterval: 0 },
        endpointName: 'getEnumList',
        originalArgs: 'EventType',
        queryCacheKey: 'getEnumList("EventType")',
      },
      requestId: 'wk2W5smgHNXHKDEAN6olC',
      rejectedWithValue: true,
      requestStatus: 'rejected',
      aborted: false,
      condition: false,
    },
    error: { message: 'Rejected' },
  });

  const mockFulfilledAction = {
    type: 'api/executeQuery/fulfilled',
    payload: {},
    meta: {
      fulfilledTimeStamp: 1696447092925,
      baseQueryMeta: { request: {}, response: {} },
      RTK_autoBatch: true,
      arg: {
        type: 'query',
        subscribe: true,
        forceRefetch: true,
        endpointName: 'getEvents',
      },
      requestId: 'jwEh6J4TCzF5zg0tIae1S',
      requestStatus: 'fulfilled',
    },
  };

  it('dispatches logout action when api call is rejected due to 401 Unauthorized', () => {
    const store = mockStore(initialState);
    let actions = store.getActions();
    expect(actions).not.toContainEqual(logoutAction);

    const mockFailedCallAction = mockRejectedAction(401);
    store.dispatch(mockFailedCallAction);
    actions = store.getActions();

    expect(actions).toContainEqual(mockFailedCallAction);
    expect(actions).toContainEqual(logoutAction);
  });

  it('dispatches logout action when api call is rejected due to invalid JWT token', () => {
    const store = mockStore(initialState);
    let actions = store.getActions();
    expect(actions).not.toContainEqual(logoutAction);

    const mockFailedCallAction = mockRejectedAction(403, JWT_INVALID_MSG);
    store.dispatch(mockFailedCallAction);
    actions = store.getActions();

    expect(actions).toContainEqual(mockFailedCallAction);
    expect(actions).toContainEqual(logoutAction);
  });

  it('dispatches logout action when api call is rejected due to INVALID JWT token', () => {
    const store = mockStore(initialState);
    let actions = store.getActions();
    expect(actions).not.toContainEqual(logoutAction);

    const mockFailedCallAction = mockRejectedAction(403, JWT_INVALID_MSG);
    store.dispatch(mockFailedCallAction);
    actions = store.getActions();

    expect(actions).toContainEqual(mockFailedCallAction);
    expect(actions).toContainEqual(logoutAction);
  });

  it('dispatches logout action when api call is rejected due to EXPIRED JWT token', () => {
    const store = mockStore(initialState);
    let actions = store.getActions();
    expect(actions).not.toContainEqual(logoutAction);

    const mockFailedCallAction = mockRejectedAction(403, JWT_EXPIRED_MSG);
    store.dispatch(mockFailedCallAction);
    actions = store.getActions();

    expect(actions).toContainEqual(mockFailedCallAction);
    expect(actions).toContainEqual(logoutAction);
  });

  it('DOES NOT dispatch logout action when api call is REJECTED due to other reason', () => {
    const store = mockStore(initialState);
    let actions = store.getActions();
    expect(actions).not.toContainEqual(logoutAction);

    const mockFailedCallAction = mockRejectedAction(404, 'MOCK NOT FOUND');
    store.dispatch(mockFailedCallAction);
    actions = store.getActions();

    expect(actions).toContainEqual(mockFailedCallAction);
    expect(actions).not.toContainEqual(logoutAction);
  });

  it('DOES NOT dispatch logout action when api call is FULLFILLED', () => {
    const store = mockStore(initialState);
    let actions = store.getActions();
    expect(actions).not.toContainEqual(logoutAction);

    store.dispatch(mockFulfilledAction);
    actions = store.getActions();

    expect(actions).toContainEqual(mockFulfilledAction);
    expect(actions).not.toContainEqual(logoutAction);
  });
});
