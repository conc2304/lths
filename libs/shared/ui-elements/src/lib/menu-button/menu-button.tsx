import { useState, MouseEvent } from 'react';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type Props = {
  buttonText: string;
  buttonAction: () => void;
};

const options = ['Do this', 'Do that', 'Hustle'];

const MenuButton = ({ buttonText, buttonAction }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Stack
        sx={{ backgroundColor: '#007882' }}
        direction="row"
        // paddingX={1}
        // paddingY={0.5}
        borderRadius={1}
        alignItems="center"
      >
        <Button onClick={() => buttonAction()} sx={{ color: 'white', paddingY: 0.75, paddingX: 2 }}>
          {buttonText}
        </Button>
        <Divider orientation="vertical" flexItem variant="middle" sx={{ bgcolor: 'white' }} />
        <IconButton sx={{ color: 'white', paddingY: 0.75, paddingX: 1 }} onClick={handleClick}>
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </Stack>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MenuButton;
