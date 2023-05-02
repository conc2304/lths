import { useMemo } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DrawerContent from './drawer-content';
import DrawerHeader from './drawer-header';
import DrawerFullScreenStyled from './drawer-styled-full';
import DrawerMiniScreenStyled from './drawer-styled-mini';
import { LayoutDrawerProps } from './types';
import { setDrawerVisibility, useLayout } from '../../../context';

const MainDrawer = ({ sections, drawerHeader, fixedHeader }: LayoutDrawerProps) => {
  const theme = useTheme();
  const isMiniScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const {
    dispatch,
    state: { drawerVisible },
  } = useLayout();
  const open = drawerVisible || false;

  const onToggleDrawer = () => {
    setDrawerVisibility(dispatch, !drawerVisible);
  };

  // header content
  const drawerContent = useMemo(() => <DrawerContent sections={sections} />, [sections]);
  const header = useMemo(() => <DrawerHeader open={open}>{drawerHeader}</DrawerHeader>, [drawerHeader, open]);
  const zIndex = !fixedHeader ? theme.zIndex.drawer : theme.zIndex.appBar;
  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex }} aria-label="mailbox folders">
      {!isMiniScreen ? (
        <DrawerFullScreenStyled variant="permanent" open={open}>
          {header}
          {drawerContent}
        </DrawerFullScreenStyled>
      ) : (
        <DrawerMiniScreenStyled
          //container={container}
          variant="temporary"
          open={open}
          onClose={onToggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          {open && header}
          {open && drawerContent}
        </DrawerMiniScreenStyled>
      )}
    </Box>
  );
};

export default MainDrawer;
