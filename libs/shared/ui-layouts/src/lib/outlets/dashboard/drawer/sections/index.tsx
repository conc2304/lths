import { Box, IconButton } from '@mui/material';
import { Menu, MenuOpen } from '@mui/icons-material';

import DrawerContent from './content';
import { LayoutDrawerContentProps } from './types';
import { SimpleBarScroll as SimpleBar } from '../../../../components/simple-bar';
import { useLayoutActions } from '../../../../context';

import 'simplebar-react/dist/simplebar.min.css';

const DrawerScrollBarContent = ({ sections }: LayoutDrawerContentProps) => {
  const { drawerOpen, setDrawerOpen } = useLayoutActions();
  return (
    <SimpleBar
      data-testid="Dashboard-Drawer--content"
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
          height: 'inherit',
        },
      }}
    >
      <Box
        component="nav"
        aria-label="Dashboard Navigation Menu"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'inherit',
          alignContent: 'start',
        }}
      >
        <DrawerContent sections={sections} />
        <Box
          sx={{
            p: '0.5rem',
            color: (theme) => theme.palette.action.active,
            borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
          }}
          display="flex"
          justifyContent={'start'}
        >
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
            data-testid="Dashboard-Drawer--drawer-toggle"
          >
            {drawerOpen ? <MenuOpen /> : <Menu />}
          </IconButton>
        </Box>
      </Box>
    </SimpleBar>
  );
};

export default DrawerScrollBarContent;
