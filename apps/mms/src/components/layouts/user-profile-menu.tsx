import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { EditAttributes, LogoutOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useAppSelector, selectUserId, selectUserDisplayName } from '@lths/features/mms/data-access';
import { useLogoutMutation } from '@lths/shared/data-access';

export const UserProfileMenu = () => {
  const [logout] = useLogoutMutation();
  const userId = useAppSelector((state) => selectUserId(state));
  const userName = useAppSelector(selectUserDisplayName);

  const theme = useTheme();

  const handleLogout = async () => {
    await logout(userId);
  };

  return (
    <Box data-testid="User-Profile-Menu--root">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
            <Stack>
              <Typography variant="h6">{userName}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <IconButton size="large" color="secondary" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Grid>
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
        <ListItemButton component={Link} to="/user/profile">
          <ListItemIcon>
            <EditAttributes />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};
