import React, { useEffect, useState } from 'react';

import { AssetsRequest, useLazyGetAssetsItemsQuery } from '@lths/features/mms/data-access';
import { TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';

import AssetsModal from './modal';
import { ConnectedAssetsModalProps } from './types';

const ConnectedAssetsModal = ({ open, onClose, onSelect }: ConnectedAssetsModalProps) => {
  const [getData, { isFetching, isLoading, data }] = useLazyGetAssetsItemsQuery();
  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>(undefined);

  async function fetchData(pagination: TablePaginationProps, sorting: TableSortingProps, search = '') {
    const req: AssetsRequest = {};
    if (pagination != null) {
      req.page = pagination.page;
      req.page_size = pagination.pageSize;
    }
    if (sorting != null) {
      req.sort_key = sorting.column;
      req.sort_order = sorting.order;
    }
    if (search !== '') {
      req.search = search;
    }

    getData(req);
  }

  useEffect(() => {
    fetchData(null, undefined);
  }, []);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    setCurrPagination(pagination);
    setCurrSorting(sorting);
    fetchData(pagination, sorting);
  };

  const onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: any) => {
    const newPageSize = Number(event.target.value);
    setCurrPagination({
      ...currPagination,
      pageSize: newPageSize,
    });
    fetchData({ ...currPagination, pageSize: newPageSize }, currSorting);
  };

  const onSortClick = (pagination: TablePaginationProps, sorting: TableSortingProps) => {
    setCurrPagination(pagination);
    setCurrSorting(sorting);
    fetchData(pagination, sorting);
  };

  const total = data?.meta?.total || 0;

  return (
    <AssetsModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      assetData={data?.data}
      isFetching={isFetching}
      isLoading={isLoading}
      total={total}
      onPageChange={onPageChange}
      onSortClick={onSortClick}
      onRowsPerPageChange={onRowsPerPageChange}
      fetchData={fetchData}
    />
  );
};

export default ConnectedAssetsModal;
