import React from 'react';
import { TableRow, TableCell, Box, lighten } from '@mui/material';

import { AssetExtendedListProps } from '@lths/features/mms/data-access';
import { ActionMenu } from '@lths/shared/ui-elements';

import { cleanUrl } from '../utils';

type TableFileInfoRowProps = {
  assetData: AssetExtendedListProps;
  onSelectFile: () => void;
  isSelected?: boolean;
  onModalClose: () => void;
  onModalOpen: (action: string, row: AssetExtendedListProps) => void;
  onPreview: () => void;
  onDownload: () => void;
};

const TableFileInfoRow: React.FC<TableFileInfoRowProps> = ({
  assetData,
  onSelectFile,
  isSelected,
  onModalOpen,
  onPreview,
  onDownload,
}) => {
  const menuOptions = (assetData: AssetExtendedListProps) => [
    {
      id: 'preview',
      label: 'Preview',
      action: () => {
        onPreview();
      },
    },
    {
      id: 'download',
      label: 'Download',
      action: () => {
        onDownload();
      },
    },
    {
      id: 'rename',
      label: 'Rename',
      action: () => {
        onModalOpen('Rename', assetData);
      },
    },
    {
      id: 'delete',
      label: 'Delete',
      action: () => {
        onModalOpen('Delete', assetData);
      },
    },
  ];

  const handleOnClick = () => {
    onSelectFile();
  };

  const cleanName =
    assetData.original_file_name.slice(0, assetData.original_file_name.lastIndexOf('.')) ||
    assetData.original_file_name;

  return (
    <TableRow
      key={assetData._id}
      sx={{
        backgroundColor: (theme) => (isSelected ? lighten(theme.palette.primary.light, 0.5) : '#fff'),
      }}
    >
      <TableCell onClick={handleOnClick} sx={{ cursor: 'pointer' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img
            src={(assetData.media_files.length > 0 && cleanUrl(assetData.media_files[0]?.url)) || ''}
            alt={assetData.unique_file_name}
            style={{ width: 50, height: 50, marginRight: 15, objectFit: 'contain' }}
          />
          {cleanName}
        </Box>
      </TableCell>
      <TableCell onClick={handleOnClick} sx={{ cursor: 'pointer' }}>
        {assetData.created_at_formatted}
      </TableCell>
      <TableCell onClick={handleOnClick} sx={{ cursor: 'pointer' }}>
        {assetData.file_extension}
      </TableCell>
      <TableCell onClick={handleOnClick} sx={{ cursor: 'pointer' }}>
        {assetData.mime_type}
      </TableCell>
      <TableCell onClick={handleOnClick} sx={{ cursor: 'pointer' }}>
        {assetData?.computed_created_by ?? ''}
      </TableCell>
      <TableCell align="center">
        <ActionMenu
          options={menuOptions(assetData)}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export { TableFileInfoRow };
