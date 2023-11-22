import { MouseEvent, useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type ActionMenuItem = {
  id: string;
  label: string;
  action: () => void;
  isDisabled?: boolean;
  hide?: boolean;
};

type ActionMenuProps = {
  options: ActionMenuItem[];
};

const ActionMenu = ({ options }: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {options.map((option) => {
          const { id, label, action, isDisabled = false, hide = false } = option;
          return (
            !hide && (
              <MenuItem
                key={id}
                onClick={() => {
                  action();
                  handleClose();
                }}
                disabled={isDisabled}
              >
                {label}
              </MenuItem>
            )
          );
        })}
      </Menu>
    </Box>
  );
};

export default ActionMenu;
