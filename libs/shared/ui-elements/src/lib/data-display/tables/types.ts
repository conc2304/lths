import { ReactNode } from 'react';
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
    onPageChange?: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      pagination: TablePaginationProps,
      sorting: TableSortingProps
    ) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    sx?: SxProps;
  };

/*
export type GenericTableCellProps = {
  id: string;
  label: string;
  type?: ColumnType;
  unit?: string;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatCell?: ({ data, type, unit }: { data: any; type?: ColumnType; unit?: string }) => string;
};

export type GenericTableProps = {
  headers: Array<GenericTableCellProps>;
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }[];
};
*/
/*export type GenericTableCellProps = {
  id: string;
  label: string;
  type?: ColumnType;
  unit?: string;
  sortable?: boolean;
  formatCell?: (data: any, type?: ColumnType, unit?: string) => string | ReactNode;
};

export type GenericTableProps = {
  headers: Array<GenericTableCellProps>;
  //data: any;
};
*/
export type TableCellType = 'string' | 'number' | 'boolean' | 'date' | 'object' | 'unknown';
export type GenericTableCellFormatProps = {
  data: Record<string, string>;
};
export type TableCellValueProps = { value: string | number; unit: string | null };
export type TableCellKeyValueProps = Record<string, string> | Record<string, TableCellValueProps>;
export type GenericTableCellProps = {
  id: string;
  label: string;
  type?: TableCellType;
  unit?: string;
  sortable?: boolean;
  formatCell?: (data: string | TableCellValueProps, type?: TableCellType, unit?: string) => string | ReactNode;
};

export type GenericTableProps = {
  headers: Array<GenericTableCellProps>;
  data: Array<TableCellKeyValueProps>;
};
