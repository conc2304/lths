import { SxProps } from '@mui/material/styles';

export type HeadCellProps = {
  id: string;
  label: string;
  sortable: boolean;
};

export type OrderProp = 'asc' | 'desc';

export type TableProps = {
  totalCount: number;
  title: string;
  onExportClick?: () => void;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  headers: HeadCellProps[];
  tableRows: JSX.Element[];
  pagination: {
    page: number;
    itemsPerPage: number;
  };
  sorting: {
    order: OrderProp;
    orderBy: string;
  };
  handleSortRequest: (key: string) => void;
  sx?: SxProps;
};
