import React, { useState, useEffect } from 'react';
import { Button, Popover} from '@mui/material';
import { ChromePicker, ColorResult } from 'react-color';

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorPickerPopup = ({ value, onChange }: ColorPickerProps) => {
  const [localColor, setLocalColor] = useState(value);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    setLocalColor(value);
  }, [value]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleConfirm = () => {
    setAnchorEl(null);
    onChange(localColor);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLocalColor(value);
  };

  const handleChange = (colorResult: ColorResult) => {
    const colorString = `rgba(${colorResult.rgb.r}, ${colorResult.rgb.g}, ${colorResult.rgb.b}, ${colorResult.rgb.a})`;
    setLocalColor(colorString);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button onClick={handleClick}
        sx={{
          minWidth: "25px", minHeight: "25px", padding: "5px",
          backgroundColor: "transparent",
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          cursor: 'pointer', 
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          }
        }}
      >
        <div style={{ padding: "8px", borderRadius: '2px', background: localColor }}/>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ChromePicker color={localColor} onChange={handleChange}
          styles={{
            default: {
              picker: {
                boxShadow: 'none'
              },
            },
          }}
        />
        <Button fullWidth={true} variant="contained" onClick={handleConfirm} sx={{borderTopRightRadius: 0, borderTopLeftRadius: 0}}>
          Apply Color
        </Button>
      </Popover>
    </div>
  );


};
export default ColorPickerPopup;
