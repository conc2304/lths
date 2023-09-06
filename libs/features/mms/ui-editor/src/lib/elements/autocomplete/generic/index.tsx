import { ChangeEvent, HTMLAttributes, ReactNode  } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

import { AutocompleteOptionProps } from '../../../core/index';


type GenericAutocompleteProps = {
  label?: string;
  value: string;
  data: AutocompleteOptionProps[];
  onChange: (value: string) => void;
  getOptionLabel?: (option: AutocompleteOptionProps) => string;
  renderOption?:(props: HTMLAttributes<HTMLLIElement>, option: AutocompleteOptionProps) => ReactNode;
};

const GenericAutocomplete = (props: GenericAutocompleteProps) => {
  const { label, data, value = '', onChange, getOptionLabel, renderOption, ...rest } = props

  const handleGetOptionLabel = (option: AutocompleteOptionProps) => {
    if(getOptionLabel) return getOptionLabel(option);
    return (option?.name || option?.value ? `${option.name || option.value}` : '');
  }

  const handleRenderOption = (props: HTMLAttributes<HTMLLIElement>, option: AutocompleteOptionProps) => {
    if(renderOption) return renderOption(props, option);
    return ( 
      <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
        <Box>{option.name}</Box>
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
      result = data.find((a) => a.name.toLowerCase() === customInput)?.value || '';
    } else if(item) {
      result = item.value;
    }
    onChange(result);
  };

  const selectedAutocompleteOptionProps = data.find((a) => a.value === value) || { value: value };
  return (
    <Autocomplete
      freeSolo
      value={selectedAutocompleteOptionProps}
      options={data}
      getOptionLabel={handleGetOptionLabel}
      renderOption={handleRenderOption}
      onChange={handleAutocompleteChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off', // disable autofill
          }}
        />
      )}
      {...rest}
    />
  );
};

export default GenericAutocomplete;