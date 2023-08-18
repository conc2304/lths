import { useState } from 'react';
import { Box } from '@mui/system';
import { SketchPicker, ColorResult } from 'react-color';

import { BasicLabel } from '../labels';

type ColorPickerProps = {
  label: string;
  value: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({ value, onChange, label }: ColorPickerProps) => {
  const [data, setData] = useState(value);

  const handleChange = (colorResult: ColorResult) => {
    setData(colorResult.hex);
    onChange(colorResult.hex);
  };

  return (
    <Box sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      <BasicLabel label={label} />
      <SketchPicker color={data} onChange={handleChange} />
    </Box>
  );
};
export default ColorPicker;
