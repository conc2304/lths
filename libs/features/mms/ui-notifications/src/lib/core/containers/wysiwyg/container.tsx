import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';

import { Content } from '../types';

type WysiwygProps = {
  content: Content;
};

const Container = ({ content: { content, headline } }: WysiwygProps) => {
  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} paddingTop={5}>
        <Card sx={{ width: 320 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: '1px solid #0000001f', color: '#00000099', fontWeight: 500, fontSize: '14px' }}
            padding={2}
            alignItems="center"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src="https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/honda-center-app-icon.png"
                variant="square"
                sx={{ bgColor: 'gray', width: 30, height: 30 }}
              />
              <Typography>Honda Center</Typography>
            </Stack>
            <Typography>Now</Typography>
          </Stack>
          <CardContent sx={{ padding: 4 }}>
            <Typography fontWeight={600} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
              {headline}
            </Typography>
            <Typography marginTop={1}>{content}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Container;
