import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="search-notifications">Search</InputLabel>
    <OutlinedInput
      id="search-notifications"
      type="text"
      value=""
      label="Search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  </FormControl>
);

export default Search;
