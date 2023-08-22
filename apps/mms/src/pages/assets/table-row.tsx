import React from 'react';
import { TableRow, TableCell, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Asset } from '@lths/features/mms/data-access';

import { cleanUrl } from '../../components/assets/utils';

type TableFileInfoRowProps = {
  row: Asset;
  index: number;
  handleSelectFile: () => void;
  handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectedPreviewRow: any;
  theme: any;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleOpenModal: (action: string, row: Asset) => void;
  handlePreview: () => void;
  selectedRowIndex: number;
  handleDownload: () => void;
};

const TableFileInfoRow: React.FC<TableFileInfoRowProps> = ({
  row,
  index,
  handleSelectFile,
  handleOpenMenu,
  selectedPreviewRow,
  theme,
  selectedRowIndex,
  anchorEl,
  handleClose,
  handleOpenModal,
  handlePreview,
  handleDownload,
}) => {
  const withStopPropagation = (callback) => (event) => {
    event.stopPropagation();
    callback(event);
  };

  return (
    <TableRow
      key={row._id}
      style={{
        cursor: 'pointer',
        backgroundColor: selectedPreviewRow?.asset?._id === row._id ? theme.palette.secondary.main : '#fff',
      }}
      onClick={handleSelectFile}
    >
      <TableCell sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img
          src={(row.media_files.length > 0 && cleanUrl(row.media_files[0]?.url)) || ''}
          alt={row.unique_file_name}
          style={{ width: 50, height: 50, marginRight: 1 }}
        />
        {row.original_file_name}
      </TableCell>
      <TableCell>
        {row.created_at === undefined
          ? new Date(row.created_on).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : new Date(row.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
      </TableCell>
      <TableCell>{row.file_extension}</TableCell>
      <TableCell>{row.mime_type}</TableCell>
      <TableCell>{row.created_by}</TableCell>
      <TableCell align="right" sx={{ pr: 5 }}>
        <IconButton onClick={(event) => handleOpenMenu(event)} size="large">
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={row._id}
          anchorEl={anchorEl}
          keepMounted
          open={selectedRowIndex === index}
          onClose={withStopPropagation(handleClose)}
        >
          <MenuItem onClick={withStopPropagation(handlePreview)}>Preview</MenuItem>
          <MenuItem onClick={withStopPropagation(handleDownload)}>Download</MenuItem>
          <MenuItem onClick={withStopPropagation(() => handleOpenModal('Rename', row))}>Rename</MenuItem>
          <MenuItem onClick={withStopPropagation(() => handleOpenModal('Delete', row))}>Delete</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default TableFileInfoRow;
