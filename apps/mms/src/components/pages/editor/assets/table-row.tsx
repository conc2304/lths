import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

interface MediaFile {
  url: string;
}

interface TableRowData {
  id: string;
  media_files: MediaFile[];
  unique_file_name: string;
  original_file_name: string;
  created_at: string;
  file_extension: string;
  mime_type: string;
  media_type: string;
}

interface TableFileInfoRowProps {
  row: TableRowData;
  onSelect: (url: string) => void;
}

export const TableFileInfoRow: React.FC<TableFileInfoRowProps> = ({ row, onSelect }) => {
  return (
    <TableRow hover key={row.id} style={{ backgroundColor: '#fff' }}>
      <TableCell
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        onClick={() => onSelect((row.media_files.length > 0 && row.media_files[0]?.url) || '')}
      >
        <img
          src={(row.media_files.length > 0 && row.media_files[0]?.url) || ''}
          alt={row.unique_file_name}
          style={{ width: '50px', height: '50px' }}
        />
        <span style={{ marginLeft: 10 }}>{row.original_file_name}</span>
      </TableCell>

      <TableCell>{row.created_at}</TableCell>
      <TableCell>{row.file_extension}</TableCell>
      <TableCell>{row.mime_type}</TableCell>
      <TableCell>{row.media_type}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          onClick={() => onSelect((row.media_files.length > 0 && row.media_files[0]?.url) || '')}
        >
          INSERT
        </Button>
      </TableCell>
    </TableRow>
  );
};
