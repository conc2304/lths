import { faker } from '@faker-js/faker';
import { nanoid } from '@reduxjs/toolkit';

const payload = {
  data: [
    {
      id: nanoid(),
      title: 'Kings v Ducks',
      start_date: faker.date.soon(),
    },
    {
      id: nanoid(),
      title: 'Penguins v Ducks',
      start_date: faker.date.soon(),
    },
    {
      id: nanoid(),
      title: 'Kings v Penguins',
      start_date: faker.date.soon(),
    },
    {
      id: nanoid(),
      title: 'Ducks v Washington',
      start_date: faker.date.soon(),
    },
    {
      id: nanoid(),
      title: 'Colorado v Ducks',
      start_date: faker.date.soon(),
    },
    {
      id: nanoid(),
      title: 'Ducks v Arizona',
      start_date: faker.date.soon(),
    },
    {
      id: nanoid(),
      title: 'Ducks v Toronto',
      start_date: faker.date.soon(),
    },
  ],
};

export default payload;
