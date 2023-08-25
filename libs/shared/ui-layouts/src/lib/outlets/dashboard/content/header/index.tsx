import { Box, Stack, SxProps, Typography } from '@mui/material';

import { useLayoutActions } from '../../../../context';

export type PageHeaderProps = {
  title?: string;
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  sx?: SxProps;
};

const PageHeader = (props: PageHeaderProps) => {
  const { leftContent, rightContent, sx = {} } = props;

  const { pageTitle } = useLayoutActions();
  const title = props.title ? props.title : pageTitle;

  return (
    <Box sx={sx}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row">
          {title && (
            <Typography variant="h1" fontWeight={400} fontSize={24}>
              {title}
            </Typography>
          )}
          {leftContent}
        </Stack>
        {rightContent}
      </Stack>
    </Box>
  );
};

export default PageHeader;
