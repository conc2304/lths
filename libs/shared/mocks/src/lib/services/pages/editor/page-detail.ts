import { rest } from 'msw';
import payload from './page-detail.stub';

const response = rest.get(/\/api\/models\/page\/(.+)$/, function async(req, res, ctx) {
    return res(
      ctx.delay(0),
      ctx.json({
       data:  payload,
      })
    );
  });

  
  
  export default response;