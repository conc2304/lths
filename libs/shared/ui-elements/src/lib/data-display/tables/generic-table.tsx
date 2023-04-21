import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { formatCell } from './utils';

import type { GenericTableProps } from './types';

const GenericTable = ({ headers, data }: GenericTableProps) => {
  console.log('🚀 ~ file: generic-table.tsx:9 ~ GenericTable ~ headers:', headers);
  return (
    <Table>
      <React.Fragment>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.id}>{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.id}>
                  {header.formatCell
                    ? header.formatCell(row[header.id], header.type, header.unit)
                    : formatCell(row[header.id], header.type, header.unit)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </React.Fragment>
    </Table>
  );
};

export default GenericTable;
