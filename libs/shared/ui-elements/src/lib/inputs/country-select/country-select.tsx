import * as React from 'react';
import { AutocompleteValue, SxProps } from '@mui/material';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { Countries, CountryType } from '@lths/shared/utils';

type CountrySelectProps = {
  value?: CountryType | string;
  onChange?: (
    event: React.SyntheticEvent,
    value: AutocompleteValue<CountryType, unknown, unknown, unknown>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<CountryType>
  ) => void;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  showPhoneCode?: boolean;
  showCountryCode?: boolean;
  showCountryFlag?: boolean;
  textFieldProps?: TextFieldProps;
  autoCompleteSx?: SxProps;
  label?: string;
  fullWidth?: boolean;
  countryOptions?: CountryType[];
  id?: string;
};

export const CountrySelect = (props: CountrySelectProps) => {
  const {
    value: valueProp = null,
    autoCompleteSx,
    showPhoneCode,
    showCountryCode,
    showCountryFlag = true,
    textFieldProps,
    fullWidth = false,
    label,
    onChange,
    onBlur,
    id,
    countryOptions = Countries,
  } = props;

  let value: CountryType | null = null;
  if (typeof valueProp === 'string') {
    value =
      countryOptions.find((country) => {
        return valueProp === country.label;
      }) || null;
  } else if (valueProp) {
    value = valueProp;
  }

  const sortedOptions = [...countryOptions].sort((a: CountryType, b: CountryType) => {
    // If 'a' is suggested and 'b' is not, 'a' comes first
    if (a.suggested && !b.suggested) return -1;
    // If 'b' is suggested and 'a' is not, 'b' comes first
    if (b.suggested && !a.suggested) return 1;
    // If both have the same 'suggested' status, sort alphabetically by 'label'
    return a.label.localeCompare(b.label);
  });

  return (
    <Autocomplete
      data-testid="Country-Select--root"
      id={id}
      aria-label="Country"
      sx={{ ...autoCompleteSx }}
      value={value}
      groupBy={(sortedOptions) => (sortedOptions.suggested ? 'Suggested' : 'Rest of World')}
      options={sortedOptions}
      onChange={onChange}
      onBlur={onBlur}
      autoHighlight
      fullWidth={fullWidth}
      getOptionLabel={(option: CountryType) => option.label}
      renderOption={(props, option: CountryType) => (
        <Box
          data-testid="Country-Select--option"
          role="option"
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {showCountryFlag && (
            <img
              data-testid="Country-Select--flag"
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt={`${option.code} Flag`}
            />
          )}
          {option.label} {showCountryCode && `(${option.code})`} {showPhoneCode && `+${option.phone}`}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth={fullWidth}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          sx={{ minWidth: '12rem' }}
          {...textFieldProps}
        />
      )}
    />
  );
};
