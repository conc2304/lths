import React, { useState } from 'react';
import { Box } from '@mui/system';
import { SketchPicker, ColorResult } from 'react-color';

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [data, setData] = useState(value);

  const handleChange = (colorResult: ColorResult) => {
    setData(colorResult.hex);
    onChange(colorResult.hex);
  };

  return (
    <Box sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      <SketchPicker color={data} onChange={handleChange} />
    </Box>
  );
};
export default ColorPicker;
