import { rest } from 'msw';

import data from './stubs/components/actions';

const response = rest.get(/\/api\/pages\/components\/actions$/, function async(req, res, ctx) {
  return res(
    ctx.delay(0),
    ctx.json({
      data,
    })
  );
});

export default response;
