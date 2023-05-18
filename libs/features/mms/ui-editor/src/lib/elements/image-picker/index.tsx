import React, { ChangeEvent, useState } from 'react';
import { Box } from '@mui/system';

import { BasicTextField } from '../text-fields';

type ImagePickerProps = {
  initialValue: string;
  onChange: (value: string) => void;
};

const ImagePicker = ({ initialValue, onChange }: ImagePickerProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValue(value);
    onChange(value);
  };

  return (
    <Box sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      <BasicTextField label={'Image URL'} value={value} onChange={handleChange} />;
    </Box>
  );
};
export default ImagePicker;
