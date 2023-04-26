import { Box, Stack, SxProps, Typography } from '@mui/material';

export interface PageHeaderProps {
  title?: string;
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  sx?: SxProps;
}

export function PageHeader(props: PageHeaderProps) {
  const { title, leftContent, rightContent, sx = {} } = props;

  return (
    <Box sx={sx}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row">
          {title && (
            <Typography variant="h1" fontWeight={300}>
              {title}
            </Typography>
          )}
          {leftContent}
        </Stack>
        {rightContent}
      </Stack>
    </Box>
  );
}

export default PageHeader;
