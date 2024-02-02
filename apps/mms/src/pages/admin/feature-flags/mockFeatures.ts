import { faker } from '@faker-js/faker';

export type FeatureFlag = {
  description: string;
  enabled: boolean;
  title: string;
  module: string;
};

const modules = Array.from({ length: 5 }, () => faker.commerce.product());

export const generateMockFlags = (totalFeatures = 25): FeatureFlag[] => {
  return Array.from({ length: totalFeatures }, () => ({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    enabled: faker.datatype.boolean(),
    module: faker.helpers.arrayElement(modules),
  }));
};
