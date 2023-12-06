import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

const DrawerMiniScreenStyled = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: theme.palette.sideBar.width || 260,
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundImage: 'none',
    boxShadow: 'inherit',
  },
}));
export default DrawerMiniScreenStyled;
