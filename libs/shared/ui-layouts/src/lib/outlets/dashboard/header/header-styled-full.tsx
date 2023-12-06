import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

import { shouldForwardProp } from '../../utils/mui-utils';
import { LayoutCommonProps, LayoutDrawerStateProps } from '../drawer/sections/types';

type Props = LayoutDrawerStateProps & LayoutCommonProps;
//shouldForwardProp - Configure which props should be forwarded on DOM, prop is not array, it just represent single property
const HeaderFullScreenStyled = styled(AppBar, {
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
      marginLeft: fixedHeader ? 0 : theme.palette.sideBar.width || 260,
      width: fixedHeader ? '100%' : `calc(100% - ${theme.palette.sideBar.width || 260}px)`,
    }),
  };
});

export default HeaderFullScreenStyled;
