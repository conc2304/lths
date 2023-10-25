import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import { DRAWER_WIDTH } from '../../config';
import { LayoutDrawerStateProps } from '../sections/types';

const DesktopDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<LayoutDrawerStateProps>(({ theme, open }) => {
  if (open) {
    const styles = {
      backgroundColor: theme.palette.sideBar.background,
      width: DRAWER_WIDTH,
      borderRight: `1px solid ${theme.palette.divider}`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),

      boxShadow: 'none',
    };
    return {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      ...styles,
      '& .MuiDrawer-paper': styles,
    };
  } else {
    const styles = {
      backgroundColor: theme.palette.sideBar.background,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      borderRight: 'none',
    };
    return {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      ...styles,
      '& .MuiDrawer-paper': styles,
    };
  }
});
export default DesktopDrawer;
