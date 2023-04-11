import React from 'react';

import { SampleHeaderCells } from './mocks';
import { Table } from './table';

import type { ComponentStory } from '@storybook/react';
export default {
  component: Table,
  title: 'Table',
};

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  headerCells: [],
  tableRows: [],
};
export const Loading = Template.bind({});
Loading.args = {
  //headerCells: SampleHeaderCells,
  tableRows: [],
  loading: true,
};

export const WithHeaders = Template.bind({});
WithHeaders.args = {
  headerCells: SampleHeaderCells,
  tableRows: [],
};
export const WithData = Template.bind({});
WithData.args = {
  headerCells: SampleHeaderCells,
  tableRows: [],
  total: 10,
};
