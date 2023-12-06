import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Theme, CSSObject } from '@mui/material/styles';

export const OpenedMixin = (theme: Theme): CSSObject => ({
  width: theme.palette.sideBar.width || 260,
  backgroundColor: theme.palette.sideBar.background,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const ClosedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.sideBar.background,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const DesktopDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: theme.palette.sideBar.width || 260,
  flexShrink: 0,
  backgroundColor: theme.palette.sideBar.background,
  borderRight: `1px solid ${theme.palette.divider}`,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  boxShadow: 'none',
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
