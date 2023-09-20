import React, { Dispatch, SetStateAction } from 'react';

import { Asset } from '@lths/features/mms/data-access';
import { TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';

type onSelectProp = { onSelect: (url: string) => void };
type fetchDataProps = (pagination: TablePaginationProps, sorting: TableSortingProps, search?: string) => Promise<void>;
type assetsProps = {
  data: Asset[];
  isFetching: boolean;
  total: number;
  isLoading: boolean;
  onFetch: fetchDataProps;
  onSortClick?: (pagination: TablePaginationProps, sorting: TableSortingProps) => void;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => void;
  onRowsPerPageChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => void;
};
export type ConnectedAssetsModalProps = onSelectProp & { open: boolean; onClose: () => void };
export type AssetModalProps = ConnectedAssetsModalProps &
  assetsProps & {
    search?: string;
    onSearch?: Dispatch<SetStateAction<string>>;
  };
