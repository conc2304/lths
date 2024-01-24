export type RowBuilderProps<TData extends object> = {
  data: TData;
  headerCells: ListViewColumnHeader[];
  showRowNumber?: boolean;
};

export type RowBuilderFn<TData extends object = Record<any, any>> = ({
  data,
  headerCells,
  showRowNumber,
}: RowBuilderProps<TData>) => JSX.Element;

export type HeaderToEventValueMapFn<TData extends object = Record<any, any>> = (
  data: TData,
  column: string
) => Date | string | number | undefined;

export type SortDirection = 'asc' | 'desc';

export type ListViewColumnHeader = {
  id: string;
  label: string;
  sortable: boolean;
};
