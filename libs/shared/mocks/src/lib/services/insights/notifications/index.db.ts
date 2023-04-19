import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';

const db = factory({
  notifications: {
    id: primaryKey(nanoid),
    page: String,
    impressions: Number,
    dateTime: String,
    clickThrough: String,
    type: String,
  },
});

const createNotificationsData = () => {
  const page = faker.random.words(2);
  const impressions = faker.datatype.number();
  const dateTime = faker.date.recent().toUTCString();
  const clickThrough =
    faker.datatype.number({
      max: 100,
      min: 0,
      precision: 0.1,
    }) + '%';
  const type =
    'Type ' +
    faker.datatype.number({
      min: 1,
      max: 10,
    });

  return {
    page,
    impressions,
    dateTime,
    clickThrough,
    type,
  };
};

//generate notifications data
for (let i = 0; i < 100; i++) {
  db.notifications.create(createNotificationsData());
}

export default db;
