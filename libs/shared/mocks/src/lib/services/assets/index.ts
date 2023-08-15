import { rest } from 'msw';

import db from './index.db';
import { RESPONSE_DELAY_MS, ITEMS_PER_PAGE } from '../constants';

const response = rest.get(/\/api\/media[?|/]?$/, function (req, res, ctx) {
  const page = Number(req.url.searchParams.get('page')) || 0;
  const itemsPerPage = Number(req.url.searchParams.get('page_size')) || ITEMS_PER_PAGE;
  const assets = db.assets.getAll();
  const totalCount = assets.length;

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const data = assets.slice(startIndex, endIndex);

  return res(
    ctx.delay(RESPONSE_DELAY_MS),
    ctx.json({
      data,
      meta: {
        total: totalCount,
        page,
        page_size: itemsPerPage,
      },
    })
  );
});

const addResource = rest.post(/\/api\/media[?|/]?$/, (req, res, ctx) => {
  const newAsset = req.body as any;
  const addedAsset = db.assets.create(newAsset);

  return res(ctx.delay(RESPONSE_DELAY_MS), ctx.json(addedAsset));
});

const editResource = rest.patch(/\/api\/media[?|/]?$/, (req, res, ctx) => {
  const { id, original_file_name } = req.body as any;
  // ToDO: support other edits

  const updatedAsset = db.assets.update({
    where: {
      _id: {
        equals: id,
      },
    },
    data: { original_file_name: original_file_name },
  });

  return res(ctx.status(200), ctx.delay(RESPONSE_DELAY_MS), ctx.json(updatedAsset));
});

const deleteResource = rest.delete(/\/api\/media[?|/]?$/, (req, res, ctx) => {
  const { _id } = req.body as any;
  const deletedAsset = db.assets.delete({
    where: {
      _id: {
        equals: _id,
      },
    },
  });

  return res(ctx.delay(RESPONSE_DELAY_MS), ctx.json(deletedAsset));
});

export default [response, addResource, editResource, deleteResource];
