import { ChangeEvent, HTMLAttributes } from 'react';
import { TextField, Autocomplete, Box, Avatar } from '@mui/material';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { EnumValue } from '@lths/features/mms/data-access';
type SocialIconAutocompleteProps = {
  value: string;
  socialIcons: EnumValue[];
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index) => void;
};

const SocailIconAutoComplete = ({ socialIcons, onChange }: SocialIconAutocompleteProps) => {
  const getOptionLabel = (socialIcons) => `${socialIcons.name}`;
  const renderOption = (props: HTMLAttributes<HTMLLIElement>, socialIcons) => {
    const { name, value } = socialIcons;
    return (
      <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props} key={name}>
        <Avatar src={value} variant="square" />
        <Box padding={1}>{name}</Box>
      </Box>
    );
  };
  const handleAutocompleteChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, item: EnumValue) => {
    event.target.value = item ? item.value : '';
    onChange(event, item);
  };

  return (
    <Autocomplete
      id="Social Icon"
      getOptionLabel={getOptionLabel}
      options={socialIcons}
      renderOption={renderOption}
      renderInput={(params) => <TextField {...params} label="Icon" />}
      onChange={handleAutocompleteChange}
    />
  );
};
export default SocailIconAutoComplete;
