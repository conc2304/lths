import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Theme, CSSObject } from '@mui/material/styles';

import { DRAWER_WIDTH } from '../../config';

export const OpenedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const ClosedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DesktopDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...OpenedMixin(theme),
    '& .MuiDrawer-paper': OpenedMixin(theme),
  }),
  ...(!open && {
    ...ClosedMixin(theme),
    '& .MuiDrawer-paper': ClosedMixin(theme),
  }),
}));
export default DesktopDrawer;
