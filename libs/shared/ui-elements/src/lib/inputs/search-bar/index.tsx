import { ChangeEvent, useEffect, useState } from 'react';
import { InputAdornment, SxProps, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { ColorThemeMui } from '../../types';

type Props = {
  value: string;
  onSearch: (value: string) => void;
  sx?: SxProps;
  debounceTime?: number;
  size?: 'small' | 'medium';
  color?: ColorThemeMui;
  placeholder?: string;
};

export const SearchBar = (props: Props) => {
  const { value = '', onSearch, sx, debounceTime = 250, size, color, placeholder = 'Search' } = props;

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
      data-testid="Searchbar--root"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      fullWidth
      size={size}
      color={color}
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
