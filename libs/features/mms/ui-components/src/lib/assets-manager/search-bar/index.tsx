import React from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function AssetSearchBar({
  handleSearchChange,
  search,
  isFocused,
  handleFocus,
  handleBlur,
}: {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  isFocused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}) {
  return (
    <Grid container spacing={2} marginTop={'1vw'}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          onChange={handleSearchChange}
          value={search}
          label="Search"
          variant="outlined"
          onFocus={handleFocus}
          onBlur={handleBlur}
          InputLabelProps={{
            shrink: isFocused,
            style: isFocused
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
      </Grid>
    </Grid>
  );
}
