import * as React from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Slide, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FullScreenDialogProps = {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const FullScreenDialog = ({
  title,
  isOpen,
  handleClose,
  children,
}: FullScreenDialogProps) => {

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative', borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={ handleClose}
            aria-label="close"
            sx={{ ml: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ pl: 1, fontSize: 18, fontWeight: 500 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
}