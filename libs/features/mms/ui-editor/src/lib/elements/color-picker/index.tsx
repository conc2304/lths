import React, { useState } from 'react';
import { Box } from '@mui/system';
import { SketchPicker, ColorResult } from 'react-color';

type ColorPickerProps = {
  initialColor: string;
  onChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ initialColor, onChange }) => {
  const [color, setColor] = useState(initialColor);

  const handleChange = (colorResult: ColorResult) => {
    setColor(colorResult.hex);
    onChange(colorResult.hex);
  };

  return (
    <Box sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      <SketchPicker color={color} onChange={handleChange} />
    </Box>
  );
};
export default ColorPicker;
