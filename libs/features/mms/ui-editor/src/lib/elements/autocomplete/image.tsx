import { Box } from '@mui/material';

import GenericAutocomplete from './generic';
import { AutocompleteOptionProps } from '../../core/index';

const ImageDisplay = (option:  AutocompleteOptionProps) => {

  return (<>
      <img
        loading='lazy'
        src={option.value}
        alt={option.name + "_image"}
        style={{ width: '20px', height: '20px' }}
      />
      <Box sx={{ paddingLeft: 2 }}>{option.name}</Box>
    </>);
}

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
        customOptionDisplay={ImageDisplay}
        {...rest}
    />
  );
};

export default ImageAutocomplete;