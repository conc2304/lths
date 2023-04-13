import { Button, Stack, Typography } from '@mui/material';

import { TableTitleProps } from './types';
import { TableTitleSkeleton } from '../../feedback/skeletons';
import { formatString } from '../../utils/string-utils';

export const TableTitleRow = (props: TableTitleProps) => {
  const { total = 0, loading, title, onExportClick } = props;

  return loading ? (
    <TableTitleSkeleton loading={loading} />
  ) : (
    <Stack direction="row" justifyContent="space-between" px={2} py={3}>
      <Typography variant="h2" fontWeight={400}>
        {formatString(title, total.toLocaleString())}
      </Typography>
      {onExportClick && (
        <Button variant="outlined" onClick={onExportClick}>
          EXPORT
        </Button>
      )}
    </Stack>
  );
};
