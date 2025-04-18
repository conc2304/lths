import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { LayoutDrawerStateProps } from './sections/types';

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })<LayoutDrawerStateProps>(
  ({ theme, open }) => ({
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-start' : 'center',
    paddingLeft: theme.spacing(open ? 3 : 0),
  })
);

export default DrawerHeaderStyled;
