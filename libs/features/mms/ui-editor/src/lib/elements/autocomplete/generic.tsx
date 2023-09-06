import { ChangeEvent, HTMLAttributes, ReactNode  } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

import { AutocompleteOptionProps } from '../../core/index';


type GenericAutocompleteProps = {
  label?: string;
  value: string;
  data: AutocompleteOptionProps[];
  onChange: (value: string) => void;
  customGetOptionLabel?: (option: AutocompleteOptionProps) => string;
  customOptionDisplay?: (option: AutocompleteOptionProps) => ReactNode;
};

const GenericAutocomplete = (props: GenericAutocompleteProps) => {
  const { label, data, value = '', onChange, customGetOptionLabel, customOptionDisplay, ...rest } = props

  const getOptionLabel = (option: AutocompleteOptionProps) => (option?.name || option?.value ? `${option.name || option.value}` : '');

  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: AutocompleteOptionProps) => {
    return ( 
      <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
        {customOptionDisplay ? 
          customOptionDisplay(option)
          :
          (<Box>{option.name}</Box>)
        }
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
      getOptionLabel={customGetOptionLabel || getOptionLabel}
      renderOption={renderOption}
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