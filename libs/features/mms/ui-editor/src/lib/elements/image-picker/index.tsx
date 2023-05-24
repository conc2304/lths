import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

import { BasicTextField } from '../text-fields';

type ImagePickerProps = {
  value: string;
  onChange: (value: string) => void;
  onReplace: (callback: (url: string) => void) => void;
};

const ImagePicker = ({ value, onChange, onReplace }: ImagePickerProps) => {
  const [data, setData] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setData(value);
    onChange(value);
  };

  const handleReplace = () => {
    onReplace && onReplace(onChange);
  };

  return (
    <Box sx={{ '.sketch-picker': { boxShadow: 'none', border: 'none' } }}>
      <BasicTextField label={'Image URL'} value={data} onChange={handleChange} />
      <Button variant="text" onClick={handleReplace}>
        Replace
      </Button>
    </Box>
  );
};
export default ImagePicker;
