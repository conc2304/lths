import { rest } from 'msw';

import { RESPONSE_DELAY_MS } from '../../constants';
import { db } from '../../database';

const handlers = [
  rest.get('/api/users', function (req, res, ctx) {
    const data = db.users.getAll();
    return res(ctx.delay(RESPONSE_DELAY_MS), ctx.json(data));
  }),
];
export default handlers;
