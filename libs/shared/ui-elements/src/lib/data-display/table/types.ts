import { Property } from 'csstype';

export type RowBuilderProps<TData extends object = Record<string, unknown>> = {
  data: TData;
  headerCells: TableColumnHeader[];
  wrapWithTRElem?: boolean;
  showRowNumber?: boolean;
  rowNumber?: number;
  noDataMessage?: string;
};

export type RowBuilderFn<TData extends object = Record<string, unknown>> = ({
  data,
  headerCells,
  wrapWithTRElem,
  noDataMessage,
  rowNumber,
  showRowNumber,
}: RowBuilderProps<TData>) => JSX.Element;

export type TableChangeEvent = {
  page: number;
  rowsPerPage: number;
  sortOrder: SortDirection;
  orderBy: string;
};

export type TablePaginationProps = {
  page: number;
  pageSize: number;
};

export type TableSortingProps = {
  order: SortDirection;
  column: string | null;
};

export type HeaderToEventValueMapFn<TData extends object = Record<string, unknown>> = (
  data: TData,
  column: string
) => Date | string | number | undefined;

export type SortDirection = 'asc' | 'desc';

export type ColumnLabelTextFormat = 'uppercase' | 'lowercase' | 'capitalize' | 'unformatted';

export type TableColumnHeader<Key extends string = string> = Record<string, unknown> & {
  id: Key;
  label: string;
  sortable: boolean;
  width?: Property.Width;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
};

export type PersistantUserSettings = {
  rowsPerPage?: string | number;
};
