import { Dispatch } from 'react';
import { AnyAction, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line no-restricted-imports
import toast from 'react-hot-toast';

import { TOAST_DURATION } from '@lths/shared/ui-elements';
import { hashString } from '@lths/shared/utils';

import { errorToasterMiddleware } from './error-toaster-middleware'; // Replace with the actual import path
import { MockRejectedAction, MockFulfilledAction } from './mockActions';
jest.mock('react-hot-toast');

describe('errorToasterMiddleware', () => {
  let next;
  let action: PayloadAction<any>;
  let invokeMiddleware;

  beforeEach(() => {
    next = jest.fn() as Dispatch<AnyAction>;
    invokeMiddleware = errorToasterMiddleware({} as MiddlewareAPI)(next);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next for non-error action', () => {
    action = MockFulfilledAction;
    invokeMiddleware(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(toast).not.toHaveBeenCalled();
  });

  it('should call toast with the correct id when status is 401, 403, 500', () => {
    const errorMsgMap = {
      401: {
        id: 'unauthorized',
        msgPre: 'Unauthorized',
      },
      403: {
        id: 'forbidden',
        msgPre: 'Forbidden',
      },
      500: {
        id: 'serverError',
        msgPre: 'Server Error',
      },
    };

    for (const [statusCode, { id, msgPre }] of Object.entries(errorMsgMap)) {
      const errorMsg = 'MockError';
      const rejectedAction = MockRejectedAction(Number(statusCode), errorMsg);

      invokeMiddleware(rejectedAction);

      const expectedMsg = `${msgPre}: ${rejectedAction.payload.data.message}`;
      const expectedId = `${id}_${hashString(expectedMsg.toString())}`;

      const messageMatcher = new RegExp(`${msgPre}.*${errorMsg}`);

      expect(toast).toHaveBeenCalledTimes(1);
      expect(toast).toHaveBeenCalledWith(expect.stringMatching(messageMatcher), {
        id: expectedId,
        type: 'important',
        duration: TOAST_DURATION,
      });
      jest.clearAllMocks();
    }
  });

  it('should call toast with NO ID when the status codes are 400, 404, or fallback', () => {
    for (const statusCode of [400, 404, 302]) {
      const errorMsg = 'No Bueno';
      const rejectedAction = MockRejectedAction(statusCode, errorMsg);
      invokeMiddleware(rejectedAction);

      const messageMatcher = new RegExp(`${errorMsg}`);

      expect(toast).toHaveBeenCalledTimes(1);
      expect(toast).toHaveBeenCalledWith(expect.stringMatching(messageMatcher), {
        id: undefined,
        type: 'important',
        duration: TOAST_DURATION,
      });
      jest.clearAllMocks();
    }
  });

  it('should call toast with ID when there is a generic action error', () => {
    const errorMsg = 'No Bueno';
    const errorStatus = 'MASS FAILURE';
    const rejectedAction = {
      type: 'api/executeQuery/rejected',
      payload: {
        success: false,
        error: errorMsg,
        status: errorStatus,
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
    };

    invokeMiddleware(rejectedAction);

    const expectedMsg = rejectedAction.payload.error;
    const expectedId = `${rejectedAction.payload.status}_${hashString(expectedMsg.toString())}`;

    const messageMatcher = new RegExp(`${errorMsg}`);

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith(expect.stringMatching(messageMatcher), {
      id: expectedId,
      type: 'important',
      duration: TOAST_DURATION,
    });
  });
});
