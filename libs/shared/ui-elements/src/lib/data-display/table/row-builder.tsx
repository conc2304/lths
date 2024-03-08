import { TableCell, TableRow } from '@mui/material';

import { slugify } from '@lths/shared/utils';

import { RowBuilderProps } from './types';
import { BaseColumnValue } from './utils';

export const BaseRowBuilder = ({
  data,
  headerCells = [],
  wrapWithTRElem = true,
  showRowNumber = false,
  rowNumber = undefined,
  noDataMessage = 'No records found',
}: RowBuilderProps<Record<string, unknown>>) => {
  if (!data || typeof data == 'undefined') {
    return <TableCell>{noDataMessage}</TableCell>;
  }

  const title = (data.title ?? data.name ?? data.id ?? 'N/A') as string;

  const rowContent = headerCells.map((col) => {
    const value = BaseColumnValue(data, col.id).toString();

    return (
      <TableCell
        key={`tc-${col.id}-${slugify(title).slice(-4)}`}
        sx={{ fontSize: '0.75rem', color: (theme) => theme.palette.grey[600] }}
        align={col.align}
      >
        {value.toString()}
      </TableCell>
    );
  });

  const rowNumberCell = <TableCell>{rowNumber}</TableCell>;

  return wrapWithTRElem ? (
    <TableRow tabIndex={-1} key={`tr-${slugify(title)}`} sx={{ height: '5.6rem' }} role="row">
      {showRowNumber && rowNumber && rowNumberCell}
      {rowContent}
    </TableRow>
  ) : (
    <>
      {showRowNumber && rowNumber && rowNumberCell}
      {rowContent}
    </>
  );
};
