import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest } from 'msw';

type MockResponse = {
  data: Record<string, unknown> | Record<string, unknown>[];
  status: number;
};

type ResponseTransformer = (req: RestRequest<never, PathParams<string>>, res: ResponseComposition<DefaultBodyType>, ctx: RestContext) => Promise<MockResponse>;

/**
 *
 * @param method - the http method for the call to intercept, set to 'all' to entercept every method for the given path
 * @param path - the url path for MSW to watch and intercept
 * @param passThrough - lets the request pass through without being intercepted or changed
 *  and returns the original response from the server
 *  * note - passthrough takes priority over fail
 * @param fail - if set to true it will return the failResponse body and status
 * @param delay - amount of time to delay the request, if not set it will default to 0
 * @param responseTransformer - a callback function to use when you need to do dynamic response transformations
 *  * note - this will take priortity over setting fail to true
 */
export type MSWPathConf = {
  /** The domain for MSW to watch and intercept.
   * It will fall back to the variable set in the `.env` file at build time */
  api?: string;
  /** The url path for MSW to watch and intercept */
  path: string;
  /** The http method for the call to intercept, set to 'all' to entercept every method for the given path */
  method: 'post' | 'put' | 'get' | 'delete' | 'patch' | 'all';
  /**
   * Lets the request pass through without being intercepted or changed
   *  and returns the original response from the server
   *  * note - passthrough takes priority over fail and responseTransformer
   */
  passThrough: boolean;
  /**
   * If set to true it will return the failResponse body and status
   */
  fail?: boolean;
  /**
   *  The amount of time in ms to delay the request, if not set it will default to 0
   */
  delay?: number;
  successResponse?: MockResponse;
  failResponse?: MockResponse;
  /**
   * A callback function to use when you need to do dynamic response transformations
   * @param req
   * @param res
   * @param ctx
   * @returns {object} MockResponse Object
   */
  responseTransformer?: ResponseTransformer;
};
