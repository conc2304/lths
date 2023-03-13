import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import { DRAWER_WIDTH } from '../config';
import { LayoutDrawerStateProps } from './types';

const DrawerFullScreenStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<LayoutDrawerStateProps>(({ theme, open }) => {
  if (open) {
    const styles = {
      width: DRAWER_WIDTH,
      borderRight: `1px solid ${theme.palette.divider}`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      'overflow-x': 'hidden', //styles not letting me use overflowX
      boxShadow: 'none',
    };
    return {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',

      ...styles,
      '& .MuiDrawer-paper': styles,
    };
  } else {
    const styles = {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      'overflow-x': 'hidden',
      width: 0,
      borderRight: 'none',
    };
    return {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box', //TODO:this is not needed

      ...styles,
      '& .MuiDrawer-paper': styles,
    };
  }
});
export default DrawerFullScreenStyled;
