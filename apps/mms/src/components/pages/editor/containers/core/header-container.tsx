import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

import editorTheme from '../core/theme';

type TitleProps = {
  title: string;
  description: string;
  infoText: string;
};

export const HeaderContainer = (props: TitleProps) => {
  const { title, description, infoText } = props;

  const theme = useTheme();

  return (
    <Box>
      <Stack direction={'row'} gap={1}>
        <Typography variant="h5">{title}</Typography>
        <Tooltip title={infoText} arrow placement="top">
          <InfoOutlined sx={{ color: theme.palette.grey[500], fontSize: theme.spacing(2.55) }} />
        </Tooltip>
      </Stack>
      <Typography variant="body2" color={editorTheme.header.color} marginTop={1}>
        {description}
      </Typography>
    </Box>
  );
};
