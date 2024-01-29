import { Property } from 'csstype';

export type RowBuilderProps<TData extends object> = {
  data: TData;
  headerCells: TableColumnHeader[];
  wrapWithTRElem?: boolean;
  noDataMessage?: string;
};

export type RowBuilderFn<TData extends object = Record<any, any>> = ({
  data,
  headerCells,
  wrapWithTRElem,
  noDataMessage,
}: RowBuilderProps<TData>) => JSX.Element;

export type TableChangeEvent = {
  page: number;
  rowsPerPage: number;
  sortOrder: SortDirection;
  orderBy: string;
};

export type HeaderToEventValueMapFn<TData extends object = Record<any, any>> = (
  data: TData,
  column: string
) => Date | string | number | undefined;

export type SortDirection = 'asc' | 'desc';

export type TableColumnHeader = {
  id: string;
  label: string;
  sortable: boolean;
  width?: Property.Width;
};

export type PersistantUserSettings = {
  rowsPerPage?: string | number;
};
