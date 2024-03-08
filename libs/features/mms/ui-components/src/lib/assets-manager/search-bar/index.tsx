import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function AssetSearchBar({
  onSearch,
  search,
  isFocused,
  handleFocus,
  handleBlur,
  debounceTime = 250,
}: {
  onSearch: (value: string) => void;
  search: string;
  isFocused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  debounceTime?: number;
}) {
  const [inputValue, setInputValue] = useState(search || '');

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const debounceSearch = () => {
    let timer: NodeJS.Timeout;

    return (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);

      clearTimeout(timer);
      timer = setTimeout(() => {
        onSearch(e.target.value);
      }, debounceTime);
    }
  }

  const handleChange = useCallback(debounceSearch(), [onSearch, debounceTime]);

  return (
    <TextField
      fullWidth
      onChange={handleChange}
      value={inputValue}
      label="Search"
      variant="outlined"
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputLabelProps={{
        shrink: (isFocused || !!inputValue),
        style: (isFocused || !!inputValue)
          ? {
              marginLeft: '10px',
              backgroundColor: '#fff',
              paddingRight: '10px',
            }
          : { marginLeft: '30px', backgroundColor: '#fff', paddingRight: '10px' },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
