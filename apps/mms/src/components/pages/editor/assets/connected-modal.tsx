import React, { useState, useEffect } from 'react';

import {
  AssetsRequestProps,
  useLazyGetAssetsItemsQuery,
  useLazySearchAssetsQuery,
} from '@lths/features/mms/data-access';
import { TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';

import AssetsModal from './modal';
import { ConnectedAssetsModalProps } from './types';

const ConnectedAssetsModal = ({ open, onClose, onSelect }: ConnectedAssetsModalProps) => {
  const [getData, { isFetching, isLoading, data }] = useLazyGetAssetsItemsQuery();
  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>(undefined);
  const [localData, setLocalData] = useState(null);
  const [triggerSearch, { data: searchResult }] = useLazySearchAssetsQuery();
  const [search, setSearch] = useState('');

  const onFetch = async (pagination: TablePaginationProps, sorting: TableSortingProps, search = '') => {
    const req: AssetsRequestProps = {};
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

    await getData(req);
  };

  useEffect(() => {
    onFetch({ page: 1, pageSize: 10 }, { column: 'defaultColumn', order: 'asc' });
  }, []);
  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  useEffect(() => {
    if (search !== '') {
      const searchParams = {
        queryString: search,
        page: 0,
        page_size: localData?.meta?.total,
      };
      triggerSearch(searchParams);
      setLocalData(searchResult);
    } else {
      onFetch(null, undefined);
    }
  }, [search]);

  useEffect(() => {
    if (searchResult) {
      setLocalData(searchResult);
    }
  }, [searchResult]);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    setCurrPagination(pagination);
    setCurrSorting(sorting);
    onFetch(pagination, sorting);
  };

  const total = localData?.meta?.total || 0;

  return (
    <AssetsModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      data={localData?.data}
      isFetching={isFetching}
      isLoading={isLoading}
      total={total}
      onPageChange={onPageChange}
      onFetch={onFetch}
      search={search}
      onSearch={setSearch}
    />
  );
};

export default ConnectedAssetsModal;
