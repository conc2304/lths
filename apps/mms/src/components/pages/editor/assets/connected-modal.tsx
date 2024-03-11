import React, { useState, useEffect } from 'react';

import {
  AssetsRequestProps,
  useLazyGetAssetsItemsQuery,
  useAddResourceMutation,
  useAppSelector,
} from '@lths/features/mms/data-access';
import { useLazyGetUserQuery } from '@lths/shared/data-access';
import { toast } from '@lths/shared/ui-elements';
import { TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';

import AssetsModal from './modal';
import { ConnectedAssetsModalProps } from './types';

// * header keys should match the key they are associated with on the backend for sorting
// *   not be some random slugified version of label, unless you are explicitly remapping those fields
const headers = [
  {
    id: 'original_file_name',
    label: 'Name',
    sortable: true,
  },
  {
    id: 'created_on',
    label: 'Created',
    sortable: true,
  },
  {
    id: 'file_extension',
    label: 'File Extension',
    sortable: true,
  },
  {
    id: 'file_type',
    label: 'File Type',
    sortable: true,
  },
  {
    // * we use 'created_by' for api calls for sorting, but we use 'computed_created_by' from the assets response for the data to display
    id: 'created_by',
    label: 'Owner',
    sortable: true,
  },
  {
    id: 'asset_actions',
    label: '',
    sortable: false,
  },
];

const ConnectedAssetsModal = ({ open, onClose, onSelect }: ConnectedAssetsModalProps) => {
  const user = useAppSelector((state) => state.auth);
  const [getData, { isFetching, isLoading, data }] = useLazyGetAssetsItemsQuery();
  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>({ order: 'desc', column: headers[1].id });
  const [search, setSearch] = useState({ queryString: '' });

  useEffect(() => {
    if (open) {
      onFetch(currPagination, currSorting, search);
    }
  }, [currPagination, currSorting, search]);

  useEffect(() => {
    if (open) {
      if (currPagination) {
        setCurrPagination({ ...currPagination, page: 0 });
      }
      setSearch({ queryString: '' });
      setCurrSorting({ order: 'desc', column: headers[1].id });
    }
  }, [open]);

  const onFetch = async (
    pagination: TablePaginationProps,
    sorting: TableSortingProps,
    search: { queryString: string }
  ) => {
    const req: AssetsRequestProps = {};
    if (pagination != null) {
      req.page = pagination.page;
      req.page_size = pagination.pageSize;
    }
    if (sorting != null) {
      req.sort_key = sorting.column;
      req.sort_order = sorting.order;
    }
    if (search != null && search.queryString !== '') {
      req.queryString = search.queryString;
    }

    await getData(req);
  };

  const onSearch = (value) => {
    if (currPagination) {
      setCurrPagination({ ...currPagination, page: 0 });
    }
    setSearch({ queryString: value });
  };

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    setCurrPagination(pagination);
    setCurrSorting(sorting);
  };

  const total = data?.pagination?.totalItems || 0;

  const [addResource] = useAddResourceMutation();

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        await handleAddAsset(file);
      } else {
        console.error('Invalid file type:', file.type);
      }
    }
  };
  const [getUser] = useLazyGetUserQuery();

  const handleAddAsset = async (file) => {
    const newAsset = file;

    try {
      const owner = await getUser(user.userId);
      await addResource({ newAsset, user: owner?.data?.data?.username }).unwrap();
      toast.add('Asset has been added successfully.', { type: 'success' });
      if (currPagination) {
        setCurrPagination({ ...currPagination, page: 0 });
      }
      setSearch({ queryString: '' });
      setCurrSorting({ order: 'desc', column: headers[1].id });
    } catch (error) {
      console.error('Failed to add asset:', error);
    }
  };

  return (
    <AssetsModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      headerCells={headers}
      data={data?.data}
      isFetching={isFetching}
      isLoading={isLoading}
      total={total}
      onPageChange={onPageChange}
      pagination={currPagination}
      sorting={currSorting}
      onUpload={handleUpload}
      search={search.queryString}
      onSearch={onSearch}
    />
  );
};

export default ConnectedAssetsModal;
