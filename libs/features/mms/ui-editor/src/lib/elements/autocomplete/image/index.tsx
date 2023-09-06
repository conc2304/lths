import { HTMLAttributes } from 'react';
import { Box, Avatar } from '@mui/material';

import { AutocompleteOptionProps } from '../../../core/index';
import GenericAutocomplete from '../generic';

const renderImageDisplay = (props: HTMLAttributes<HTMLLIElement>, option:  AutocompleteOptionProps) => (
    <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
      <Avatar sx={{ width: 20, height: 20 }} variant="square" alt={option.name + "_image"} src={option.value} />
      <Box sx={{ paddingLeft: 2 }}>{option.name}</Box>
    </Box>
);

type ImageAutocompleteProps = {
  label?: string;
  value: string;
  data: AutocompleteOptionProps[];
  onChange: (value: string) => void;
};

const ImageAutocomplete = (props: ImageAutocompleteProps) => {
  const { label, data, value = '', onChange, ...rest } = props

  return (
    <GenericAutocomplete
        label={label}
        value={value}
        data={data}
        onChange={onChange}
        renderOption={renderImageDisplay}
        {...rest}
    />
  );
};

export default ImageAutocomplete;