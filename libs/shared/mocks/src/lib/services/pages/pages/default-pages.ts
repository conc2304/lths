import { rest } from 'msw';

import db from './index.db';
import { RESPONSE_DELAY_MS } from '../../constants';

const response = rest.get(/\/api\/pages\/default[?|/]?$/, function async(req, res, ctx) {
  const defaultPages = db.default.getAll();
  return res(
    ctx.delay(RESPONSE_DELAY_MS),
    ctx.json({
      data: defaultPages,
    })
  );
});

export default response;
