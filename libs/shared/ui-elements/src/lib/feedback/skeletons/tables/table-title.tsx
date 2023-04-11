import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const TableTitleSkeleton = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <Stack justifyContent={'space-between'} direction="row" spacing={4} mr={1}>
      <Skeleton width={400} />

      <Skeleton width={100} height={50} />
    </Stack>
  ) : null;
};
