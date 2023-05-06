import { DefaultBodyType, PathParams, ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { getApiFullPath } from './services/api';
import InsightServices from './services/insights/index';
import { CustomServices } from './services/insights/index';
import MobilePageServices, { CustomServices as PagesCustomServices } from './services/pages';
// Handlers that need custom logic in the response transformer
export const customHandlers = [...CustomServices, ...PagesCustomServices];
export const defaultHandlers = [...InsightServices, ...MobilePageServices];
// Handlers that are generated from the config object
const generatedHandlers = defaultHandlers.map(
  ({ api, path, method, fail, passThrough, delay, successResponse, failResponse, responseTransformer }) => {
    return rest[method](
      `${getApiFullPath(api, path)}`,
      async (
        req: RestRequest<never, PathParams<string>>,
        res: ResponseComposition<DefaultBodyType>,
        ctx: RestContext
      ) => {
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
  }
);

const handlers = [...generatedHandlers, ...customHandlers];
export default handlers;
