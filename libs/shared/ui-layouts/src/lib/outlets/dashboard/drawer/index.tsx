import { useMemo } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DrawerHeader from './header';
import { DesktopDrawer } from './screens/desktop';
import DrawerContent from './sections';
import { LayoutDrawerProps } from './sections/types';
import { useLayoutActions } from '../../../context';

const MainDrawer = ({ sections, drawerHeader, fixedHeader }: LayoutDrawerProps) => {
  console.log({ sections, drawerHeader, fixedHeader });
  const theme = useTheme();
  console.log(JSON.stringify(sections));

  const { drawerVisible } = useLayoutActions();

  // header content
  const drawerContent = useMemo(() => <DrawerContent sections={sections} />, [sections]);
  const header = useMemo(
    () => <DrawerHeader open={drawerVisible}>{drawerHeader}</DrawerHeader>,
    [drawerHeader, drawerVisible]
  );

  const zIndex = !fixedHeader ? theme.zIndex.drawer : theme.zIndex.appBar;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex }} aria-label="mailbox folders">
      <DesktopDrawer
        data-testid="Dashboard-Drawer--desktop-root"
        variant="permanent"
        open={drawerVisible}
        PaperProps={{
          elevation: 0,
          square: true,
        }}
      >
        {header}
        {drawerContent}
      </DesktopDrawer>
    </Box>
  );
};

export default MainDrawer;
