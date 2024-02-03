import { ChangeEvent, useEffect, useState } from 'react';
import { InputAdornment, SxProps, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  value: string;
  onSearch: (value: string) => void;
  sx?: SxProps;
  debounceTime?: number;
  size?: 'small' | 'medium';
};

export const SearchBar = (props: Props) => {
  const { value = '', onSearch, sx, debounceTime = 250, size } = props;

  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    const debounceChangeHandler = setTimeout(() => {
      onSearch(inputValue);
    }, debounceTime);
    return () => clearTimeout(debounceChangeHandler);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <TextField
      placeholder="Search"
      value={inputValue}
      onChange={handleChange}
      fullWidth
      size={size}
      sx={sx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
