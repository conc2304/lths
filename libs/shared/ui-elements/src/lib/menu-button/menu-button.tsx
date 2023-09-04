import { useState, MouseEvent } from 'react';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type Menu = {
  id: string;
  label: string;
  action: () => void;
};

type Props = {
  buttonText: string;
  buttonAction: () => void;
  items: Menu[];
};

const MenuButton = ({ buttonText, buttonAction, items }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const stackSXProps = {
    backgroundColor: '#007882',
    borderBottomLeftRadius: open ? 0 : 4,
    borderBottomRightRadius: open ? 0 : 4,
  };

  return (
    <Box>
      <Stack sx={stackSXProps} direction="row" borderRadius={1} alignItems="center">
        <Button onClick={() => buttonAction()} sx={{ color: 'white', paddingY: 0.75, paddingX: 2 }}>
          {buttonText}
        </Button>
        <Divider orientation="vertical" flexItem variant="middle" sx={{ bgcolor: 'white' }} />
        <IconButton sx={{ color: 'white', paddingY: 0.75, paddingX: 1 }} onClick={handleClick}>
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </Stack>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: '#006169',
            color: 'white',
            overflow: 'visible',
            '& .MuiList-root': {
              paddingY: 0.5,
              minWidth: anchorEl?.parentElement?.clientWidth || '100%',
            },
            borderRadius: '0px 0px 4px 4px',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items.map(({ id, label, action }) => (
          <MenuItem
            key={id}
            onClick={() => {
              handleClose();
              action();
            }}
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MenuButton;
