import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const TablePaginationSkeleton = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <Stack justifyContent={'flex-end'} direction="row" spacing={4} mr={1}>
      <Skeleton width={140} />
      <Skeleton width={80} />
      <Skeleton width={60} />
    </Stack>
  ) : null;
};
