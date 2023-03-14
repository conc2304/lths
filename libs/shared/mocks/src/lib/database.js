import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

export const db = factory({
  users: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    username: String,
  },
});

const createUserData = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    firstName,
    lastName,
    username: faker.internet.userName(),
  };
};

//generate data
for (let i = 0; i < 2; i++) {
  db.users.create(createUserData());
}
