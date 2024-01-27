import { TableCell, TableRow } from '@mui/material';

import { slugify } from '@lths/shared/utils';

import { RowBuilderProps } from './types';
import { BaseColumnValue } from './utils';

export const BaseRowBuilder = ({
  data,
  headerCells = [],
  wrapWithTRElem = false,
}: RowBuilderProps<Record<any, any>>) => {
  if (!data || typeof data == 'undefined') {
    return (
      <TableRow>
        <TableCell>Event Has No Data</TableCell>
      </TableRow>
    );
  }

  const title = (data.title ?? data.name ?? 'N/A') as string;

  const rowContent = headerCells.map((col) => {
    const value = BaseColumnValue(data, col.id).toString();

    return (
      <TableCell
        key={`tc-${col.id}-${slugify(title).slice(-4)}`}
        sx={{ fontSize: '0.75rem', color: (theme) => theme.palette.grey[600] }}
      >
        {value.toString()}
      </TableCell>
    );
  });

  return wrapWithTRElem ? (
    <TableRow tabIndex={-1} key={`tr-${slugify(title)}`} sx={{ height: '5.6rem' }}>
      {rowContent}
    </TableRow>
  ) : (
    <>{rowContent}</>
  );
};
