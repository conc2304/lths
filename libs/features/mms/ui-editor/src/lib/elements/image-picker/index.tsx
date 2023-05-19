import React, { ChangeEvent, useState } from 'react';
import { Box } from '@mui/system';

import { BasicTextField } from '../text-fields';

type ImagePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

const ImagePicker = ({ value, onChange }: ImagePickerProps) => {
  const [data, setData] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setData(value);
    onChange(value);
  };

  return (
    <Box sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      <BasicTextField label={'Image URL'} value={data} onChange={handleChange} />
    </Box>
  );
};
export default ImagePicker;
