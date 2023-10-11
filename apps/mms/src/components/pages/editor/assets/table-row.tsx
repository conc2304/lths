import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

import { AssetExtendedListProps } from '@lths/features/mms/data-access';
import { cleanUrl } from '@lths/features/mms/ui-components';

interface TableFileInfoRowProps {
  row: AssetExtendedListProps;
  onSelect: (url: string) => void;
}

export const TableFileInfoRow: React.FC<TableFileInfoRowProps> = ({ row, onSelect }) => {
  const cleanName = row.original_file_name.slice(0, row.original_file_name.lastIndexOf('.')) || row.original_file_name;
  return (
    <TableRow hover key={row.id} style={{ backgroundColor: '#fff' }}>
      <TableCell
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        onClick={() => onSelect((row.media_files.length > 0 && cleanUrl(row.media_files[0]?.url)) || '')}
      >
        <img
          src={(row.media_files.length > 0 && cleanUrl(row.media_files[0]?.url)) || ''}
          alt={row.unique_file_name}
          style={{ width: '50px', height: '50px' }}
        />
        <span style={{ marginLeft: 10 }}>{cleanName}</span>
      </TableCell>

      <TableCell>{row.created_at_formatted}</TableCell>
      <TableCell>{row.file_extension}</TableCell>
      <TableCell>{row.mime_type}</TableCell>
      <TableCell>{row.created_by}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          onClick={() => onSelect((row.media_files.length > 0 && cleanUrl(row.media_files[0]?.url)) || '')}
        >
          INSERT
        </Button>
      </TableCell>
    </TableRow>
  );
};
