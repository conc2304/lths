import { rest } from 'msw';

import db from './index.db';
import { RESPONSE_DELAY_MS, ITEMS_PER_PAGE } from '../constants';

const response = rest.get(/\/api\/pages[?|/]?$/, function (req, res, ctx) {
  console.log('search params', req.url.searchParams.get('page'));
  const page = Number(req.url.searchParams.get('page')) || 1;
  const itemsPerPage = Number(req.url.searchParams.get('page_size')) || ITEMS_PER_PAGE;
  const order = req.url.searchParams.get('sort_order') || 'asc';
  const orderBy = req.url.searchParams.get('sort_key') || 'name';
  const pages = db.pages.getAll();
  const totalCount = pages.length;

  const startIndex = (page - 1) * itemsPerPage;
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

export default response;
