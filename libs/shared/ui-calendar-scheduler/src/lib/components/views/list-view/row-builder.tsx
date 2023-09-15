import { TableCell, TableRow } from '@mui/material';

import { slugify } from '@lths/shared/utils';

import { BaseColumnValue } from './column-to-event-prop';
import { RowBuilderProps } from '../../../types';

export const BaseRowBuilder = ({ event, headerCells = [] }: RowBuilderProps) => {
  if (!event || typeof event == 'undefined') {
    return (
      <TableRow>
        <TableCell>Event Has No Data</TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow tabIndex={-1} key={`tr-${slugify(event.title as string)}`} sx={{ height: '5.6rem' }}>
      {headerCells.map((col) => {
        const value = BaseColumnValue(event, col.id).toString();

        return (
          <TableCell
            key={`tc-${col.id}-${(event.title as string).slice(-4)}`}
            sx={{ fontSize: '0.75rem', color: (theme) => theme.palette.grey[600] }}
          >
            {value.toString()}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
