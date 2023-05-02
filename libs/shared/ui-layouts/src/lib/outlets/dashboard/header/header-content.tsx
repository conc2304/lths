import { Stack } from '@mui/material';

import { LayoutHeaderContentProps } from '../drawer/types';

const HeaderContent = ({ headerLeft, headerRight }: LayoutHeaderContentProps) => {
  return (
    <Stack sx={{ ml: 0.5 }} flex={'1'} direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
      {headerLeft}
      {headerRight}
    </Stack>
  );
};
export default HeaderContent;
