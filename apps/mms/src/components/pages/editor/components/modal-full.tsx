import { forwardRef, ReactElement, Ref } from 'react';
import { Box, Dialog, InputBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';

import ComponentGallery from './gallery';
import { ComponentModalProps } from './types';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ComponentModal = ({ open, onClose, components = [], onSelectComponent }: ComponentModalProps) => {
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative', borderRadius: 0 }}>
        <Toolbar>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon sx={{ color: '#ffffff' }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, color: '#ffffff', fontWeight: '700' }}
            placeholder="Search Component Library"
            inputProps={{ 'aria-label': 'search Component Library' }}
          />

          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 4, background: '#f2f2f2' }}>
        <ComponentGallery components={components} onSelectComponent={onSelectComponent} />
      </Box>
    </Dialog>
  );
};

export default ComponentModal;
