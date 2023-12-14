import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  Chip,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { HighlightOffOutlined, RemoveCircleOutline } from '@mui/icons-material';

import { ChipContainer, FormState } from '@lths/shared/ui-elements';

import { UserRole } from '../../types';

type Props = {
  rolesEditable?: boolean;
  rolesAvailable?: UserRole[];
  userRoles?: string[];
  onChange?: (userRoles: string[]) => void;
  onBlur?: () => void;
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
  const { rolesEditable = false, userRoles: userRolesProp = [], rolesAvailable = [], onChange, onBlur } = props;
  console.log({ userRolesProp });
  const [userRoles, setUserRoles] = useState<string[]>(userRolesProp);

  useEffect(() => {
    setUserRoles(userRolesProp);
  }, [userRolesProp]);

  const availableRolesList = rolesAvailable.map((role) => role.name);

  console.log({ availableRolesList, userRoles });

  const handleChange = (event: SelectChangeEvent<typeof userRolesProp>) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    const nextValue = typeof value === 'string' ? value.split(',') : value;

    onChange ? onChange(nextValue) : setUserRoles(nextValue);
  };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    console.log(event);
    // const {
    //   target: { value },
    // } = event;

    console.log({ event });

    // On autofill we get a stringified value.
    // const nextValue = typeof value === 'string' ? value.split(',') : value;

    // onChange ? onChange(nextValue) : setUserRoles(nextValue);
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

  return (
    <Box>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        fullWidth
        multiple
        readOnly={!rolesEditable}
        value={userRoles}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        // renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {availableRolesList.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={userRoles.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      <Box>
        <ChipContainer
          variant="inline"
          title="User Roles"
          selectedFilters={rolesFormState}
          onDelete={({ parentID, itemID }: { parentID: string; itemID: string }) => {
            console.log('onDelete', { parentID, itemID });
          }}
          openModal={() => {
            console.log('open modal');
          }}
        />
      </Box>
    </Box>
  );
};
