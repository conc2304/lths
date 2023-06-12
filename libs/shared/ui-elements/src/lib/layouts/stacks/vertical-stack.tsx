import { StackProps, Stack } from '@mui/material';

export const VStack = (stackProps: StackProps) => {
  return (
    <Stack direction={'column'} spacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }} {...stackProps}>
      {stackProps?.children}
    </Stack>
  );
};
