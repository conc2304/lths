import { rest } from 'msw';

import db from './index.db';
import { RESPONSE_DELAY_MS, ITEMS_PER_PAGE } from '../../constants';

const response = rest.get(/\/api\/notifications[?|/]?$/, function (req, res, ctx) {
  console.log('search params', req.url.searchParams.get('page'));
  const page = Number(req.url.searchParams.get('page')) || 0;
  const itemsPerPage = Number(req.url.searchParams.get('page_size')) || ITEMS_PER_PAGE;
  const order = req.url.searchParams.get('sort_order') || 'asc';
  const orderBy = req.url.searchParams.get('sort_key') || 'page';
  const notifications = db.notifications.getAll();
  const totalCount = notifications.length;

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const data = notifications.slice(startIndex, endIndex);

  let sortedData = data;
  if (orderBy === 'page') sortedData = data.sort((a, b) => a.page.localeCompare(b.page));
  if (orderBy === 'impressions')
    sortedData = data.sort((a, b) => (order === 'asc' ? a.impressions - b.impressions : b.impressions - a.impressions));

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
