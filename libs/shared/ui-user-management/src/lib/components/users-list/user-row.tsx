import {
  Avatar,
  Box,
  IconButton,
  Stack,
  SvgIconTypeMap,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { CheckCircle, MoreHoriz, NotInterested, PersonAdd, RadioButtonUnchecked } from '@mui/icons-material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Property } from 'csstype';

import { User } from '@lths/shared/data-access';

type Props = {
  user: User;
};

export const UserRow = (props: Props) => {
  const { user } = props;
  const { first_name, last_name, is_active, is_deleted, city, country, email, username, roles } = user;
  const theme = useTheme();

  const initials = `${first_name ? first_name.charAt(0) : ''}${
    last_name ? (first_name ? ' ' : '') + last_name.charAt(0) : ''
  }`;
  const fullName = `${first_name ? first_name : ''}${last_name ? (first_name ? ' ' : '') + last_name : ''}`.trim();
  const displayName = fullName.length ? fullName : 'N/A';

  const status = is_active ? 'Active' : !is_deleted ? 'Inactive' : 'Deleted';
  const statusColorMap: Record<typeof status, Property.Color> = {
    Active: theme.palette.success.main,
    Inactive: theme.palette.grey[600],
    Deleted: theme.palette.warning.dark,
  };

  const statusIconMap: Record<typeof status, OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>> = {
    Active: CheckCircle,
    Inactive: RadioButtonUnchecked,
    Deleted: NotInterested,
  };

  const StatusIcon = statusIconMap[status];

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Avatar
            alt="User Avatar"
            sx={{
              width: 50,
              height: 50,
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
              mr: '3rem',
            }}
          >
            {first_name || last_name ? (
              <Typography variant="button">{initials}</Typography>
            ) : (
              <PersonAdd fontSize="medium" />
            )}
          </Avatar>
          <Stack>
            <Typography variant="h4">{displayName}</Typography>
            <Typography variant="h6">{email}</Typography>
            {username !== email && <Typography variant="caption">{username}</Typography>}
          </Stack>
        </Box>
      </TableCell>

      <TableCell>
        {!roles.length ? (
          <Typography variant="caption">N/A</Typography>
        ) : (
          roles.map((role) => (
            <Typography key={role} variant="body2">
              {role}
            </Typography>
          ))
        )}
      </TableCell>
      <TableCell>{country}</TableCell>
      <TableCell>{city}</TableCell>
      <TableCell>
        <Stack direction="row">
          <StatusIcon htmlColor={statusColorMap[status]} sx={{ mr: 1 }} />
          <Typography variant="body1" color={statusColorMap[status]}>
            {status}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <IconButton size="medium">
          <MoreHoriz />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
