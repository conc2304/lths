import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { BrokenImage } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { AssetExtendedListProps, PreviewAssetRowProps } from '@lths/features/mms/data-access';

import { cleanUrl } from '../utils';

type TableFileInfoRowProps = {
  row: AssetExtendedListProps;
  index: number;
  handleSelectFile: () => void;
  handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectedPreviewRow: PreviewAssetRowProps;
  theme: any;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleOpenModal: (action: string, row: AssetExtendedListProps) => void;
  handlePreview: () => void;
  selectedRowIndex: number;
  handleDownload: () => void;
};

const ImageFallback = (): JSX.Element => (
  <Box
    sx={{
      width: 50,
      height: 50,
      mr: '15px',
      bgcolor: (theme) => theme.palette.action.disabledBackground,
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <BrokenImage fontSize="large" color="inherit" />
  </Box>
);

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
  const withStopPropagation =
    (callback: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) =>
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.stopPropagation();
      callback(event);
    };
  const [imageFound, setImageFound] = useState(true);
  const cleanName = row.original_file_name.slice(0, row.original_file_name.lastIndexOf('.')) || row.original_file_name;

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
        {imageFound ? (
          <img
            src={(row.media_files.length > 0 && cleanUrl(row.media_files[0]?.url)) || ''}
            alt={row.unique_file_name}
            style={{ width: 50, height: 50, marginRight: 15 }}
            onError={() => setImageFound(false)}
          />
        ) : (
          <ImageFallback />
        )}
        {cleanName}
      </TableCell>
      <TableCell>{row.created_at_formatted}</TableCell>
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

export { TableFileInfoRow };
