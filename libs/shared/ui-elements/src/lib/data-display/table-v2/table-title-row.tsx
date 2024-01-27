import { Button, Stack, Typography } from '@mui/material';

import { TableTitleSkeleton } from '../../feedback/skeletons';
import { formatString } from '../../utils/string-utils';
import { TableTitleProps } from '../tables/types';

export const TableTitleRow = (props: TableTitleProps) => {
  const { total = 0, loading, title = '', onExportClick } = props;

  const formattedTitle = formatString(title, total.toLocaleString());

  return loading ? (
    <TableTitleSkeleton loading={loading} />
  ) : (
    <Stack direction="row" justifyContent="space-between" px={2} py={3}>
      <Typography variant="h2" fontWeight={400}>
        {formattedTitle}
      </Typography>
      {onExportClick && (
        <Button variant="outlined" onClick={onExportClick}>
          EXPORT
        </Button>
      )}
    </Stack>
  );
};
