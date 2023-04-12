import { HOST_API } from '@lths/shared/data-access';
import { DefaultBodyType, PathParams, ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import mockedPaths from './mocked-path-registry';
import UserService from '../lib/modules/user/user-service';
import NotificationsService from '../lib/services/notifications';

// Handlers that need custom logic in the response transformer
export const customHandlers = [...UserService, ...NotificationsService];

// Handlers that are generated from the config object
const generatedHandlers = mockedPaths.map(({ api, path, method, fail, passThrough, delay, successResponse, failResponse, responseTransformer }) => {
  return rest[method](
    `${api || HOST_API}${path}`,
    async (req: RestRequest<never, PathParams<string>>, res: ResponseComposition<DefaultBodyType>, ctx: RestContext) => {
      let returnBody: Record<string, unknown> | Record<string, unknown>[];
      let returnStatus: number;

      if (passThrough) return req.passthrough();

      if (responseTransformer) {
        const response = await responseTransformer(req, res, ctx);
        const { status, data } = response;
        returnBody = data;
        returnStatus = status;
      } else {
        returnBody = fail ? failResponse.data : successResponse.data;
      }

      if (!returnStatus) {
        returnStatus = fail ? failResponse.status ?? 400 : successResponse.status ?? 200;
      }

      return res(ctx.delay(delay ?? 0), ctx.status(returnStatus), ctx.json(returnBody));
    }
  );
});

const handlers = [...generatedHandlers, ...customHandlers];
export default handlers;
