import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

import { shouldForwardProp } from '../../utils/mui-utils';
import { DRAWER_WIDTH } from '../config';
import { LayoutCommonProps, LayoutDrawerStateProps } from '../drawer/sections/types';

type Props = LayoutDrawerStateProps & LayoutCommonProps;
//shouldForwardProp - Configure which props should be forwarded on DOM, prop is not array, it just represent single property
const HeaderFullScreenStyled = styled(AppBar, {
  // shouldForwardProp: (prop) => prop !== "open",

  shouldForwardProp: (prop) => shouldForwardProp<Props>(['open', 'fixedHeader'], prop),
})<Props>(({ theme, open, fixedHeader }) => {
  //by default drawer has the higher index
  const zIndex = fixedHeader ? theme.zIndex.drawer : theme.zIndex.appBar;
  return {
    zIndex: zIndex,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: !open ? theme.transitions.duration.leavingScreen : theme.transitions.duration.enteringScreen,
    }),
    ...(open && {
      marginLeft: fixedHeader ? 0 : DRAWER_WIDTH,
      width: fixedHeader ? '100%' : `calc(100% - ${DRAWER_WIDTH}px)`,
    }),
  };
});

export default HeaderFullScreenStyled;
