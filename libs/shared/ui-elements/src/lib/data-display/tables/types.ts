import { SxProps } from '@mui/material/styles';

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
export type TableProps = {
  total: number;
  loading: boolean;
  title: string;
  headerCells: TableHeaderCellProps[];
  tableRows: JSX.Element[];
  pagination?: TablePaginationProps;
  sorting?: TableSortingProps;
  onSortClick?: (pagination: TablePaginationProps, sorting: TableSortingProps) => void;
  onExportClick?: () => void;
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, pagination: TablePaginationProps, sorting: TableSortingProps) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  sx?: SxProps;
};
