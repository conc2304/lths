import { ChangeEvent, HTMLAttributes } from 'react';
import { TextField, Autocomplete, Box, InputAdornment, Typography } from '@mui/material';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import { grey } from '@mui/material/colors';

import { PageAutocompleteItemProps } from '../../../types';

export const PageType = {
  UserDefined: 'User-Defined',
};

type PageAutocompleteProps = {
  value: string;
  data: PageAutocompleteItemProps[];
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};
const PageTypeIcon = ({ type, staticPage }: { type: string; staticPage: boolean }) => {
  const flag = type === PageType.UserDefined;
  if (staticPage) return <AdUnitsIcon sx={{ color: grey[600] }} />;
  return flag ? <RememberMeIcon sx={{ color: grey[600] }} /> : <PhoneIphoneIcon sx={{ color: grey[700] }} />;
};
const PageAutocomplete = ({ data, value = '', onChange }: PageAutocompleteProps) => {
  const IconAdornment = () => {
    const page = data?.find((a) => a.value === value);

    return (
      <InputAdornment position="start" sx={{ marginRight: 0 }}>
        <PageTypeIcon type={page?.type} staticPage={page?.static} />
      </InputAdornment>
    );
  };
  const getOptionLabel = (option: PageAutocompleteItemProps) => (option ? `${option.label}` : '');
  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: PageAutocompleteItemProps) => {
    return (
      <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
        <PageTypeIcon type={option.type} staticPage={option.static} />
        <Box>
          <Box>{option.label}</Box>
          <Typography sx={{ fontSize: 10 }}>{option.value}</Typography>
        </Box>
      </Box>
    );
  };
  const handleAutocompleteChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: PageAutocompleteItemProps
  ) => {
    const updatedEvent = { ...event, target: { ...event.target, value: item ? item.value : '' } };
    onChange(updatedEvent);
  };

  const selectedItem = data.find((a) => a.value === value) || null;
  return (
    <Autocomplete
      size="small"
      value={selectedItem}
      options={data}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onChange={handleAutocompleteChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Page ID"
          InputProps={{
            ...params.InputProps,
            autoComplete: 'off', // disable autofill
            startAdornment: <IconAdornment />,
          }}
        />
      )}
    />
  );
};

export default PageAutocomplete;
