import { SxProps } from '@mui/material/styles';

import { ProgressLoadingProps, ProgressProps } from '../../types';

export type TableHeaderCellProps = {
  id: string;
  label: string;
  sortable: boolean;
};

export type TableOrderProp = 'asc' | 'desc';
export type TablePaginationProps = {
  page: number;
  pageSize: number;
};
export type TableSortingProps = {
  order: TableOrderProp;
  column: string | null;
};
export type TableTitleProps = ProgressLoadingProps & { total: number; title: string; onExportClick?: () => void };
export type TableProps = ProgressProps &
  TableTitleProps & {
    onSortClick?: (pagination: TablePaginationProps, sorting: TableSortingProps) => void;
    headerCells: TableHeaderCellProps[];
    tableRows: JSX.Element[];
    pagination?: TablePaginationProps;
    sorting?: TableSortingProps;
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, pagination: TablePaginationProps, sorting: TableSortingProps) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    sx?: SxProps;
  };
