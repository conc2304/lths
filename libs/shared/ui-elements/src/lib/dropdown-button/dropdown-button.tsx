import * as React from 'react';
import { Button, MenuItem } from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Menu from '@mui/material/Menu';

type MenuItem = {
  id: string;
  name: string;
  action: () => void;
};

type DropdownButtonprops = {
  buttonText: string;
  menuItems: MenuItem[];
};

export const DropdownButton = ({ buttonText, menuItems }: DropdownButtonprops): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onMouseEnter={handleOpenMenu}
        aria-controls={open ? 'drop-down' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={open ? { borderBottomRightRadius: '0 !important', borderBottomLeftRadius: '0 !important' } : undefined}
      >
        {buttonText}
        <HorizontalRuleIcon sx={{ transform: 'rotate(90deg)', ml: 2.1, mr: -1 }} />
        {isOpen ? <KeyboardArrowUpIcon sx={{ mr: -1.5 }} /> : <KeyboardArrowDownIcon sx={{ mr: -1.5 }} />}
      </Button>
      <Menu
        open={open}
        id="drop-down"
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiMenu-paper': {
            backgroundColor: '#3D4752',
            color: '#fff',
            borderTopRightRadius: '0 !important',
            borderTopLeftRadius: '0 !important',
            width: '8.55rem',
          },
        }}
      >
        {menuItems.map(({ id, name, action }) => (
          <MenuItem
            key={id}
            sx={{ fontSize: '.875rem' }}
            onClick={() => {
              action();
              handleCloseMenu();
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
