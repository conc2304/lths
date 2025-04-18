import { useMemo } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DrawerHeader from './header';
import DrawerFullScreenStyled from './screens/desktop';
import DrawerMiniScreenStyled from './screens/mobile';
import DrawerContent from './sections';
import { LayoutDrawerProps } from './sections/types';
import { useLayoutActions } from '../../../context';

const MainDrawer = ({ sections, drawerHeader, fixedHeader }: LayoutDrawerProps) => {
  const theme = useTheme();
  const isMiniScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const { setDrawerVisibility, drawerVisible } = useLayoutActions();
  const open = drawerVisible || false;

  const handleToggleDrawer = () => {
    setDrawerVisibility(!drawerVisible);
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
          variant="temporary"
          open={open}
          onClose={handleToggleDrawer}
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
