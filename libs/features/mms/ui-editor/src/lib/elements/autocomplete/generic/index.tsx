import { ChangeEvent, HTMLAttributes, ReactNode  } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

import { AutocompleteOptionProps } from '../types';

type GenericAutocompleteProps = {
  label?: string;
  value: string;
  data: AutocompleteOptionProps[];
  onChange: (value: string) => void;
  getOptionLabel?: (option: AutocompleteOptionProps) => string;
  renderOption?:(props: HTMLAttributes<HTMLLIElement>, option: AutocompleteOptionProps) => ReactNode;
  renderStartAdornment?: (value: string, label?: string) => ReactNode;
};

const GenericAutocomplete = (props: GenericAutocompleteProps) => {
  const { label, data, value = '', onChange, getOptionLabel, renderOption, renderStartAdornment, ...rest } = props

  const handleGetOptionLabel = (option: AutocompleteOptionProps) => {
    if(getOptionLabel) return getOptionLabel(option);
    return (option?.label || option?.value ? `${option.label || option.value}` : '');
  }

  const handleRenderOption = (props: HTMLAttributes<HTMLLIElement>, option: AutocompleteOptionProps) => {
    if(renderOption) return renderOption(props, option);
    return ( 
      <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
        <Box>{option.label}</Box>
      </Box>
    );
  };

  const handleAutocompleteChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: AutocompleteOptionProps,
    reason: string,
  ) => { 
    let result = '';
    if(reason  === "createOption") {
      const customInput = event.target.value.toLowerCase();
      result = data.find((a) => a.label.toLowerCase() === customInput)?.value || '';
    } else if(item) {
      result = item.value;
    }
    onChange(result);
  };

  const selectedOption = data.find((a) => a.value === value);
  const selectedAutocompleteOptionProps = selectedOption || (value ? { value: value } : null);
  return (
    <Autocomplete
      value={selectedAutocompleteOptionProps}
      options={data}
      getOptionLabel={handleGetOptionLabel}
      renderOption={handleRenderOption}
      onChange={handleAutocompleteChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            startAdornment: renderStartAdornment ? renderStartAdornment(selectedOption?.value || value, selectedOption?.label) : params.InputProps.startAdornment,  
            autoComplete: 'off', // disable autofill
          }}
        />
      )}
      {...rest}
    />
  );
};

export default GenericAutocomplete;