import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface FileInfoProps {
  infoType: string;
  infoData: string;
}

export const FileInfo: React.FC<FileInfoProps> = ({ infoType, infoData }) => {
  const theme = useTheme();
  return (
    <Stack spacing={0} direction="column" sx={{ wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
      <Typography sx={{ fontWeight: 600, fontSize: theme.spacing(1.75) }}>{infoType}</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: theme.spacing(2) }}>{infoData}</Typography>
    </Stack>
  );
};

export default FileInfo;
