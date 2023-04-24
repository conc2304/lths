import { StackProps, Stack } from '@mui/material';

export const HStack = ({ children }: StackProps) => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}>
      {children}
    </Stack>
  );
};
