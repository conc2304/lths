import { rest } from 'msw';

import { RESPONSE_DELAY_MS, ITEMS_PER_PAGE } from '../constants';
import { db } from '../database/notifications-db';

const handlers = [
  rest.get('/api/notifications', function (req, res, ctx) {
    console.log('search params', req.url.searchParams.get('page'));
    const page = Number(req.url.searchParams.get('page')) || 1;
    const itemsPerPage = Number(req.url.searchParams.get('itemsPerPage')) || ITEMS_PER_PAGE;
    const order = req.url.searchParams.get('order') || 'asc';
    const orderBy = req.url.searchParams.get('orderBy') || 'page';
    const notifications = db.notifications.getAll();
    const totalCount = notifications.length;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const data = notifications.slice(startIndex, endIndex);

    let sortedData = data;
    if (orderBy === 'page') sortedData = data.sort((a, b) => a.page.localeCompare(b.page));
    if (orderBy === 'impressions') sortedData = data.sort((a, b) => (order === 'asc' ? a.impressions - b.impressions : b.impressions - a.impressions));

    return res(
      ctx.delay(RESPONSE_DELAY_MS),
      ctx.json({
        data: sortedData,
        totalCount,
        currentPage: page,
        itemsPerPage,
      })
    );
  }),
];

export default handlers;
