import { rest } from 'msw';

import db from './index.db';
import { RESPONSE_DELAY_MS, ITEMS_PER_PAGE } from '../../constants';

const getAllPagesResponse = rest.get(/\/api\/pages[?|/]?$/, function (req, res, ctx) {
  console.log('search params', req.url.searchParams.get('page'));
  const page = Number(req.url.searchParams.get('page')) || 0;
  const itemsPerPage = Number(req.url.searchParams.get('page_size')) || ITEMS_PER_PAGE;
  const order = req.url.searchParams.get('sort_order') || 'asc';
  const orderBy = req.url.searchParams.get('sort_key') || 'name';
  const pages = db.pages.getAll();
  const totalCount = pages.length;

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const data = pages.slice(startIndex, endIndex);

  let sortedData = data;
  if (orderBy)
    sortedData = data.sort((a, b) =>
      order === 'asc' ? a[orderBy]?.localeCompare(b[orderBy]) : b[orderBy]?.localeCompare(a[orderBy])
    );

  return res(
    ctx.delay(RESPONSE_DELAY_MS),
    ctx.json({
      data: sortedData,
      meta: {
        total: totalCount,
        page,
        page_size: itemsPerPage,
      },
    })
  );
});

const getDefaultPagesResponse = rest.get(/\/api\/pages\/default[?|/]?$/, function async(req, res, ctx) {
  const defaultPages = db.default.getAll();
  return res(
    ctx.delay(RESPONSE_DELAY_MS),
    ctx.json({
      data: defaultPages,
    })
  );
});

const savePageConstraintsResponse = rest.post(
  /\/api\/models\/pages\/constraints\/(.+)$/,
  function async(req, res, ctx) {
    return res(
      ctx.delay(RESPONSE_DELAY_MS),
      ctx.json({
        message: 'success',
      })
    );
  }
);

const response = [getAllPagesResponse, getDefaultPagesResponse, savePageConstraintsResponse];

export default response;
