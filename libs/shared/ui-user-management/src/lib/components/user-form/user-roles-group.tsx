import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { ChipContainer, FormState } from '@lths/shared/ui-elements';

import { UserRole } from '../../types';

type Props = {
  rolesEditable?: boolean;
  rolesAvailable?: UserRole[];
  userRoles?: string[];
  onChange?: (userRoles: string[]) => void;
  onBlur?: () => void;
  size?: 'small' | 'medium';
  placeholder?: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const UserRolesFormGroup = (props: Props) => {
  const {
    rolesEditable = false,
    userRoles: userRolesProp = [],
    rolesAvailable = [],
    onChange,

    size = 'medium',
    placeholder,
  } = props;

  const [userRoles, setUserRoles] = useState<string[]>(userRolesProp);
  const availableRolesList = rolesAvailable.map((role) => role.name);

  const handleChange = (event: SelectChangeEvent<typeof userRolesProp>) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    const nextValue = typeof value === 'string' ? value.split(',') : value;

    onChange && onChange(nextValue);
    setUserRoles(nextValue);
  };

  const handleDelete = (roleRemoved: string) => {
    // On autofill we get a stringified value.
    // const nextValue = typeof value === 'string' ? value.split(',') : value;
    const nextValue = userRoles.filter((selectedRole) => roleRemoved !== selectedRole);
    onChange && onChange(nextValue);
    setUserRoles(nextValue);
  };

  const handleClearAll = () => {
    onChange && onChange([]);
    setUserRoles([]);
  };

  const rolesFormState: FormState = {};
  userRoles.forEach((role) => {
    rolesFormState[role] = {
      [role]: {
        id: role,
        value: role,
        title: role,
      },
    };
  });

  const handleDeleteUserRoles = ({ itemID }: { parentID: string; itemID: string }) => {
    //todo added as temp fix, onDelete in Chip needs to be an optional function
    if (rolesEditable) handleDelete(itemID);
  };

  return (
    <Box>
      {rolesEditable && (
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          fullWidth
          multiple
          displayEmpty
          readOnly={!rolesEditable}
          value={userRoles}
          onChange={handleChange}
          input={<OutlinedInput size={size} />}
          renderValue={(selected) => {
            if (selected.length === 0 && placeholder) {
              return <Typography sx={{ color: (theme) => theme.palette.grey[500] }}>{placeholder}</Typography>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
        >
          {placeholder && (
            <MenuItem disabled value="">
              <Typography sx={{}}>{placeholder}</Typography>
            </MenuItem>
          )}

          {availableRolesList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={userRoles.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ flexGrow: 1 }}>
          <ChipContainer
            variant="inline"
            title="User Roles"
            selectedFilters={rolesFormState}
            onDelete={handleDeleteUserRoles}
            openModal={() => {
              console.log('open modal');
            }}
          />
        </Box>

        {userRoles.length > 0 && (
          <Button variant="text" onClick={handleClearAll} sx={{ minWidth: '70px' }}>
            Clear All
          </Button>
        )}
      </Box>
    </Box>
  );
};
