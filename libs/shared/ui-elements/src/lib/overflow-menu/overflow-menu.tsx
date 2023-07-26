import * as React from 'react';
import { IconButton, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
type Menu = {
  id: string;
  label: string;
  action: () => void;
};
type Props = {
  items: Menu[];
};

export const OverflowMenu = ({ items }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen((prevOpen) => !prevOpen);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen((prevOpen) => !prevOpen);
  };
  return (
    <div>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'drop-down' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {isOpen ? (
          <Card
            sx={{
              padding: '5px',
              borderBottomRightRadius: '0 !important',
              borderBottomLeftRadius: '0 !important',
            }}
          >
            <CloseIcon sx={{ color: '#0091FF' }} />
          </Card>
        ) : (
          <MoreHorizIcon />
        )}
      </IconButton>
      <Menu
        open={open}
        id="drop-down"
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          style: {
            marginTop: '45px',
            marginLeft: '-8px',
            borderTopRightRadius: '0',
            position: 'fixed',
            padding: '6px 15px',
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {items?.map((item) => (
          <MenuItem
            onClick={() => {
              item.action();
              handleClose();
            }}
            key={item.id}
            sx={{ color: '#0091FF', fontSize: '13px', padding: '10px', ml: -1 }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
