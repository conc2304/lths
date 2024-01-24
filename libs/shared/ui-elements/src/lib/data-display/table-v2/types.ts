export type RowBuilderProps<TData extends object> = {
  data: TData;
  headerCells: ListViewColumnHeader[];
};

export type RowBuilderFn<TData extends object = Record<any, any>> = ({
  data,
  headerCells,
}: RowBuilderProps<TData>) => JSX.Element;

export type OnTableChangeOptions = {
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

// export type

export type ListViewColumnHeader = {
  id: string;
  label: string;
  sortable: boolean;
};
