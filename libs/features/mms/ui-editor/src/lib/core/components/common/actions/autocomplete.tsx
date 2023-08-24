import { ChangeEvent, HTMLAttributes } from 'react';
import { TextField, Autocomplete, Box, InputAdornment } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import { grey } from '@mui/material/colors';

import { AutocompleteItemProps } from '../../types';

export const PageType = {
  UserDefined: 'User-Defined',
};

type PageAutocompleteProps = {
  value: string;
  data: AutocompleteItemProps[];
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};
const PageAutocomplete = ({ data, value, onChange }: PageAutocompleteProps) => {
  const IconAdornment = () => {
    return (
      <InputAdornment position="start">
        {data?.find((a) => a.value === value)?.type === PageType.UserDefined ? (
          <RememberMeIcon sx={{ color: grey[600] }} />
        ) : (
          <PhoneIphoneIcon sx={{ color: grey[700] }} />
        )}
      </InputAdornment>
    );
  };
  const getOptionLabel = (option: AutocompleteItemProps) => option?.label;
  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: AutocompleteItemProps) => {
    return (
      <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
        {option.type === PageType.UserDefined ? (
          <RememberMeIcon sx={{ color: grey[600] }} />
        ) : (
          <PhoneIphoneIcon sx={{ color: grey[700] }} />
        )}
        {option.value}
      </Box>
    );
  };
  return (
    <Autocomplete
      freeSolo={true}
      value={data.find((a) => a.value === value)}
      options={data}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Page ID"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
            startAdornment: <IconAdornment />,
          }}
        />
      )}
    />
  );
};

export default PageAutocomplete;
