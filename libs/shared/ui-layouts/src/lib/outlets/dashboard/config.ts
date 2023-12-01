import { Theme, CSSObject } from '@mui/material/styles';

//TODO: Move this to theme objects
export const DRAWER_WIDTH = 260;
export const DRAWER_WIDTH_CLOSED = 'auto';

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
