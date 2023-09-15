import { MouseEvent, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { LogoutOutlined, EditAttributes } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { useAppSelector, selectUserId } from '@lths/features/mms/data-access';
import { useLogoutMutation } from '@lths/shared/data-access';
const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        '& .MuiListItemIcon-root': {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <EditAttributes />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

const Profile = () => {
  const [logout] = useLogoutMutation();
  const userId = useAppSelector((state) => selectUserId(state));

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  const handleClose = () => setOpen(false);
  const handleLogout = async () => {
    await logout(userId);
  };
  const iconBackColorOpen = 'grey.300';
  const theme = useTheme();
  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} placement={'bottom'} transition>
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
                  <CardContent sx={{ px: 1, pt: 1, py: 1 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
                          <Stack>
                            <Typography variant="h6">User Name</Typography>
                            <Typography variant="body2" color="textSecondary"></Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <IconButton size="large" color="secondary" onClick={handleLogout}>
                          <LogoutOutlined />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <ProfileTab handleLogout={handleLogout} />
                  </CardContent>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Button
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
        }}
        onClick={handleClick}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
        </Stack>
      </Button>
    </Box>
  );
};

export default Profile;
