import { rest } from 'msw';

import getComponentsDetail from './components-detail.stub';

const response = rest.get(/\/api\/pages\/component-details[?|/]?$/, function async(req, res, ctx) {
  const id = req.url.searchParams.get('id');
  return getComponentsDetail(id).then((data) =>
    res(
      ctx.delay(0),
      ctx.json({
        data,
      })
    )
  ); //.catch(error => res(ctx.status(500), ctx.json({ error: error.message })));
});

export default response;
