import React from 'react';
import { Box, Button, Stack, Typography, Divider } from '@mui/material';
import { Visibility, Download, Edit, Delete } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import { AssetExtendedListProps } from '@lths/features/mms/data-access';

import { FileInfo } from './file-info';
import { cleanUrl } from '../table/utils';

export type PreviewDrawerContentProps = {
  openModal: (modalName: string, row: AssetExtendedListProps) => void;
  asset?: AssetExtendedListProps;
};

const height = 215;
const width = 323;

export const PreviewDrawerContent = (props: PreviewDrawerContentProps) => {
  const theme = useTheme();
  const { asset, openModal } = props;
  const perc = (height / width) * 100;

  if (!asset) return null;

  const previewUrl = (asset.media_files.length > 0 && cleanUrl(asset.media_files[0]?.url)) || '';

  const iconStyle = { width: theme.spacing(2.25), height: theme.spacing(2.25) };
  const buttonStyle = { fontSize: theme.spacing(1.625), padding: `${theme.spacing(0.5)} ${theme.spacing(0.625)}` };

  const handlePreview = () => {
    const previewUrl = (asset.media_files.length > 0 && cleanUrl(asset.media_files[0]?.url)) || '';
    if (previewUrl) {
      const imageWindow = window.open('', '_blank');
      if (imageWindow) {
        imageWindow.document.write('<html><head><title>Preview</title></head><body>');
        imageWindow.document.write(
          '<img src="' + previewUrl + '" alt="Image Preview" style="max-width:100%; height:auto;">'
        );
        imageWindow.document.write('</body></html>');
        imageWindow.document.close();
      } else {
        console.error('Failed to open preview window');
      }
    } else {
      console.error('Preview URL is empty');
    }
  };
  const cleanName =
    asset.original_file_name.slice(0, asset.original_file_name.lastIndexOf('.')) || asset.original_file_name;
  return (
    <>
      <Box sx={{ margin: theme.spacing(3), marginTop: 0, marginBottom: theme.spacing(2) }}>
        <Box
          id={`${asset._id}-image-display`}
          data-testid={`${asset._id}-image-display`}
          sx={{
            backgroundImage: `url(${previewUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: 0,
            position: 'relative',
            paddingTop: `${perc}%`,
            borderRadius: '5px',
          }}
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePreview}
              startIcon={<Visibility sx={iconStyle} />}
              sx={{
                fontSize: theme.spacing(1.625),
                padding: `${theme.spacing(0.375)} ${theme.spacing(1)}`,
                bgcolor: 'white',
                color: 'black',
                '&:hover': { bgcolor: 'white', color: 'black' },
                border: `1px solid ${grey[400]}`,
              }}
            >
              PREVIEW
            </Button>
          </Box>
        </Box>
        <Stack spacing={1} direction="row" justifyContent="flex-end" sx={{ paddingTop: theme.spacing(2) }}>
          <Button
            onClick={() => previewUrl && window.open(previewUrl)}
            variant="text"
            startIcon={<Download sx={iconStyle} />}
            sx={buttonStyle}
          >
            DOWNLOAD
          </Button>
          <Button
            variant="text"
            startIcon={<Edit sx={iconStyle} />}
            sx={buttonStyle}
            onClick={() => openModal('Rename', asset)}
          >
            RENAME
          </Button>
          <Button
            variant="text"
            startIcon={<Delete sx={iconStyle} />}
            sx={buttonStyle}
            onClick={() => openModal('Delete', asset)}
          >
            DELETE
          </Button>
        </Stack>
      </Box>
      <Divider />
      <Stack
        spacing={1.5}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ padding: `${theme.spacing(2)} ${theme.spacing(3)}` }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: theme.spacing(2.5) }}>File details</Typography>
        <FileInfo infoType="File Name" infoData={cleanName} />
        <FileInfo infoType="File Extension" infoData={asset.file_extension} />
        <FileInfo infoType="Owner" infoData={asset.created_by} />
        <FileInfo infoType="File Type" infoData={asset.mime_type} />
        <FileInfo infoType="Created At" infoData={asset.created_at_formatted} />
      </Stack>
    </>
  );
};
