import { ChangeEvent, HTMLAttributes } from 'react';
import { TextField, Autocomplete, Box, InputAdornment, Typography } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import { grey } from '@mui/material/colors';

import { AutocompleteItemProps } from '../../types';
export const PageType = {
  UserDefined: 'User-Defined',
};
type SocialIconAutocompleteProps = {
  value: string;
  data: AutocompleteItemProps[];
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

const SocialTypeIcon = ({ type }: { type: string }) => {
  const flag = type === PageType.UserDefined;
  return flag ? <RememberMeIcon sx={{ color: grey[600] }} /> : <PhoneIphoneIcon sx={{ color: grey[700] }} />;
};

const SocailIconAutoComplete = ({ data, value = '', onChange }: SocialIconAutocompleteProps) => {
  const IconAdornment = () => {
    const type = data?.find((a) => a.value === value)?.type;
    return (
      <InputAdornment position="start">
        <SocialTypeIcon type={type} />
      </InputAdornment>
    );
  };
  const getOptionLabel = (option: AutocompleteItemProps) => (option ? `${option.label}(${option.value})` : '');
  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: AutocompleteItemProps) => {
    return (
      <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
        <SocialTypeIcon type={option.type} />
        <Box>
          <Box>{option.label}</Box>
          <Typography sx={{ fontSize: 10 }}>{option.value}</Typography>
        </Box>
      </Box>
    );
  };
  const handleAutocompleteChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: AutocompleteItemProps
  ) => {
    event.target.value = item ? item.value : '';
    onChange(event);
  };
  const selectedItem = data.find((a) => a.value === value) || null;

  return (
    <Autocomplete
      freeSolo
      value={selectedItem}
      options={data}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onChange={handleAutocompleteChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Page Link"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off', // disable autofill
            startAdornment: <IconAdornment />,
          }}
        />
      )}
    />
  );
};
export default SocailIconAutoComplete;
