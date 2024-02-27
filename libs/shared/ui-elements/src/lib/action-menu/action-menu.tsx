import { MouseEvent, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, PopoverOrigin } from '@mui/material';
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
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  onClickMenu?: () => void;
};

const ActionMenu = ({ options, anchorOrigin, transformOrigin, onClickMenu }: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    onClickMenu && onClickMenu();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick} sx={{ p: 2 }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {options.map((option) => {
          const { id, label, action, isDisabled = false, hide = false } = option;
          return (
            !hide && (
              <MenuItem
                key={id}
                onClick={(e) => {
                  e.stopPropagation();
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
