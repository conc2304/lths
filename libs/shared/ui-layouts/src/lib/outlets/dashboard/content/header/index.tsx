import { Box, Stack, SxProps, Typography } from '@mui/material';

import { useLayoutActions } from '../../../../context';
import { BreadcrumbPathProps } from '../breadcrumbs/types';

export type PageHeaderProps = {
  title?: string;
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  sx?: SxProps;
};

export function PageHeader(props: PageHeaderProps) {
  const { leftContent, rightContent, sx = {} } = props;

  const { breadcrumbs } = useLayoutActions();
  const title = props.title
    ? props.title
    : Array.isArray(breadcrumbs) && breadcrumbs.length > 0
    ? breadcrumbs[breadcrumbs.length - 1].title
    : (breadcrumbs as BreadcrumbPathProps).title;
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
