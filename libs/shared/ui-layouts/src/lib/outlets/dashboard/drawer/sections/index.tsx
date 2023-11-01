import { Box } from '@mui/material';

import DrawerContent from './content';
import { LayoutDrawerContentProps } from './types';
import { SimpleBarScroll as SimpleBar } from '../../../../components/simple-bar';

import 'simplebar-react/dist/simplebar.min.css';

const DrawerScrollBarContent = ({ sections }: LayoutDrawerContentProps) => {
  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box component="nav" aria-label="Dashboard Navigation Menu">
        <DrawerContent sections={sections} />
      </Box>
    </SimpleBar>
  );
};

export default DrawerScrollBarContent;
