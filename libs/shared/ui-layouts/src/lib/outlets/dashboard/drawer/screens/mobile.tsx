import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import { DRAWER_WIDTH } from '../../config';

const DrawerMiniScreenStyled = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundImage: 'none',
    boxShadow: 'inherit',
  },
}));
export default DrawerMiniScreenStyled;
