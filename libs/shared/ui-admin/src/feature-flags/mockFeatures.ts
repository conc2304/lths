import { faker } from '@faker-js/faker';

import { slugify } from '@lths/shared/utils';

import { FeatureFlag } from './types';

const modules = Array.from({ length: 5 }, () => faker.commerce.product());

export const generateMockFlags = (totalFeatures = 25): FeatureFlag[] => {
  return Array.from({ length: totalFeatures }, () => {
    const title = faker.commerce.productName();
    return {
      title: title,
      description: faker.commerce.productDescription(),
      enabled: faker.datatype.boolean(),
      module: faker.helpers.arrayElement(modules),
      id: slugify(title),
    };
  });
};
