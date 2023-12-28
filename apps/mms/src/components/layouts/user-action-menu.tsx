import React, { useState } from 'react';
import { Box, Card, CardContent, ClickAwayListener, Fade, IconButton, Paper, Popper } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';

import { SupportMenu } from './support-menu';
import { UserProfileMenu } from './user-profile-menu';

export const UserActionMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [popperContent, setPopperContent] = useState<'info' | 'profile'>();

  const theme = useTheme();

  const handleClose = (event: MouseEvent | TouchEvent) => {
    const target = event?.target as HTMLElement;
    const clickedOnMenuItem = !!target.closest('.Toolbar--menu-button');
    if (clickedOnMenuItem) return;
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, menuContent: 'info' | 'profile') => {
    setAnchorEl(event.currentTarget);
    setPopperContent(menuContent);

    // If we click on the same content mode that is open then close, otherwise open
    if (popperContent === menuContent && open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Box pr={2} data-testid="Toolbar-UserActionMenu--root">
      <Popper open={open} anchorEl={anchorEl} placement={'bottom'} transition disablePortal>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250,
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Card elevation={0} sx={{ mt: 1, p: 0, minWidth: 150 }}>
                  <CardContent sx={{ '&:last-child': { pb: 1 } }}>
                    {popperContent === 'profile' ? <UserProfileMenu /> : <SupportMenu />}
                  </CardContent>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      <IconButton
        className="Toolbar--menu-button"
        data-testid="Toolbar--info-menu-button"
        sx={{
          mr: 0.5,
          p: 1,
          '&:hover': { bgcolor: theme.palette.info.dark },
        }}
        onClick={(event) => {
          handleClick(event, 'info');
        }}
      >
        <InfoOutlined fontSize="large" sx={{ fill: open ? theme.palette.grey[300] : '#FFF', fontSize: '24px' }} />
      </IconButton>

      <IconButton
        className="Toolbar--menu-button"
        data-testid="Toolbar--support-menu-button"
        sx={{
          p: 1,
          '&:hover': { bgcolor: theme.palette.info.dark },
        }}
        onClick={(event) => handleClick(event, 'profile')}
        name="profile-menue"
      >
        <PersonIcon fontSize="large" sx={{ fill: open ? theme.palette.grey[300] : '#FFF', fontSize: '24px' }} />
      </IconButton>
    </Box>
  );
};
