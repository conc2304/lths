import React from 'react';
import { useArgs } from '@storybook/preview-api';

import { SampleHeaderCells, tableDataMocks } from './mocks';
import { Table } from './table';
import { SortDirection, TableChangeEvent } from './types';
import { BaseColumnValue, getComparator } from './utils';

import type { StoryFn } from '@storybook/react';
export default {
  component: Table,
  title: 'Data Display/Table V2',
  argTypes: {
    sortOrder: { control: 'inline-radio', options: ['desc', 'asc'] },
    orderBy: { control: 'inline-radio', options: ['page', 'impressions', 'dateTime'] },
  },
};

const mockData = tableDataMocks(117);

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />;

export const DefaultUncontrolled = Template.bind({});
DefaultUncontrolled.args = {
  title: 'Demo Table Title',
  headerCells: SampleHeaderCells,
  showFirstButton: false,
  showLastButton: false,
  showRowNumber: false,
  loading: false,
  fetching: false,
  noDataMessage: '[Mock] Custom message - no data found!',
  data: mockData,
};

// Controlled Example
export const ControlledServerSide = Template.bind({});
ControlledServerSide.decorators = [
  function Component(Story, ctx) {
    const [, setArgs] = useArgs<typeof ctx.args>();

    const onChange = ({ page, rowsPerPage, sortOrder, orderBy }: TableChangeEvent) => {
      ctx.args.onChange?.({ page, rowsPerPage, sortOrder, orderBy });
      const data = getUpdatedServerData({ page, rowsPerPage, sortOrder, orderBy });

      setArgs({ page, rowsPerPage, sortOrder, orderBy, data });
    };

    return <Story args={{ ...ctx.args, onChange }} />;
  },
];

const DefaultArgs = {
  title: '{0} Datas',
  headerCells: SampleHeaderCells,
  showFirstButton: false,
  showLastButton: false,
  showRowNumber: false,
  loading: false,
  fetching: false,
  noDataMessage: '[Mock] Custom message - no data found!',
  page: 0,
  total: mockData.length,
  rowsPerPage: 10,
  sortOrder: 'desc',
  orderBy: 'page',
  data: mockData,
};

ControlledServerSide.args = {
  title: '{0} Datas',
  headerCells: SampleHeaderCells,
  showFirstButton: false,
  showLastButton: false,
  showRowNumber: false,
  loading: false,
  fetching: false,
  noDataMessage: '[Mock] Custom message - no data found!',
  page: DefaultArgs.page,
  rowsPerPage: DefaultArgs.rowsPerPage,
  sortOrder: DefaultArgs.sortOrder as SortDirection,
  orderBy: DefaultArgs.orderBy,
  total: mockData.length,
  data: getUpdatedServerData({
    page: DefaultArgs.page,
    rowsPerPage: DefaultArgs.rowsPerPage,
    sortOrder: DefaultArgs.sortOrder as SortDirection,
    orderBy: DefaultArgs.orderBy,
  }),
};

function getUpdatedServerData({ page, rowsPerPage, sortOrder, orderBy }: TableChangeEvent) {
  const dataCopy = mockData.slice();

  const sortedData = dataCopy.sort((a, b) =>
    getComparator(sortOrder)(BaseColumnValue(a, orderBy), BaseColumnValue(b, orderBy))
  );
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const visibleData = paginatedData;
  return visibleData;
}
