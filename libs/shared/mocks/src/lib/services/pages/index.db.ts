import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';

const db = factory({
  pages: {
    id: primaryKey(nanoid),
    name: String,
    pageId: String,
    type: String,
    constraints: String,
    lastEditor: String,
    status: String,
    publishedOn: String,
    scheduledOn: String,
    draftedOn: String,
  },
});

const createPagesData = () => {
  const name = faker.random.words();
  const pageId = (faker.helpers.arrayElement(['pdp', 'sdp']) + ' ' + name).toLowerCase().split(' ').join('_');
  const type = faker.helpers.arrayElement(['Pre-Defined', 'Static']);
  const constraints = faker.random.words().split(' ').join(',');
  const lastEditor = faker.name.fullName();
  const status = faker.helpers.arrayElement([
    'Draft',
    'Published',
    'Pending approval',
    'Changes requested',
    'Scheduled',
    'Expired',
    'Archived',
  ]);

  const dateFields: Record<string, string> = {};

  dateFields[status.toLowerCase().split(' ').join('') + 'On'] = faker.date.recent().toUTCString();

  return {
    name,
    pageId,
    type,
    constraints,
    lastEditor,
    status,
    ...dateFields,
  };
};

//generate notifications data
for (let i = 0; i < 25; i++) {
  db.pages.create(createPagesData());
}

export default db;
