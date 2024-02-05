import { faker } from '@faker-js/faker';

import { FeatureFlag } from './type';

const modules = Array.from({ length: 5 }, () => faker.commerce.product());

export const generateMockFlags = (totalFeatures = 25): FeatureFlag[] => {
  return Array.from({ length: totalFeatures }, () => ({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    enabled: faker.datatype.boolean(),
    module: faker.helpers.arrayElement(modules),
  }));
};
