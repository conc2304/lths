import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { TableRowSkeletonProps } from './types';

export const TableRowSkeleton = ({ id, loading, cells = 5, rows = 1 }: TableRowSkeletonProps) => {
  return loading ? (
    <React.Fragment>
      {Array(rows)
        .fill(null)
        .map((_, r) => (
          <TableRow key={`ske_${id}_row_${r}`}>
            {Array(cells)
              .fill(null)
              .map((_, c) => (
                <TableCell key={`ske_${id}_row_${r}_cell_${c}`}>
                  <Skeleton />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </React.Fragment>
  ) : null;
};
