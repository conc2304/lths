import { HTMLAttributes } from 'react';
import { Box, Avatar } from '@mui/material';

import GenericAutocomplete from '../generic';
import { AutocompleteOptionProps } from '../types';

type ImageAutocompleteProps = {
  label?: string;
  value: string;
  data: AutocompleteOptionProps[];
  onChange: (value: string) => void;
};

const ImageAutocomplete = (props: ImageAutocompleteProps) => {
  const { label, data, value = '', onChange, ...rest } = props

  const handleRenderOption = (props: HTMLAttributes<HTMLLIElement>, option:  AutocompleteOptionProps) => (
    <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
      <Avatar variant="square" alt={`${option.label}_image`} src={option.value} 
        sx={{ 
          width: 20, height: 20,
          '& img': { objectFit: 'contain' },
        }}
      />
      <Box sx={{ paddingLeft: 2 }}>{option.label}</Box>
    </Box>
  );

  const handleRenderStartAdornment = (value: string, label?: string) => (
    <Avatar variant="square" alt={`${label || 'unnamed'}_image`} src={value} 
      sx={{ 
        width: 20, height: 20,
        visibility: value ? 'visible' : 'hidden',
        '& img': {
          objectFit: 'contain',
        },
      }} 
    />
  );

  return (
    <GenericAutocomplete
        label={label}
        value={value}
        data={data}
        onChange={onChange}
        renderOption={handleRenderOption}
        renderStartAdornment={handleRenderStartAdornment}
        {...rest}
    />
  );
};

export default ImageAutocomplete;