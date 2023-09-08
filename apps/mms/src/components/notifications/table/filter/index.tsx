import { FormControl, InputAdornment, InputLabel, Select } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Filter = () => {
  return (
    <FormControl fullWidth>
      <InputLabel>Filter by</InputLabel>
      <Select
        id="filter-notifications"
        label="Filter by"
        startAdornment={
          <InputAdornment position="start">
            <FilterListIcon />
          </InputAdornment>
        }
      ></Select>
    </FormControl>
  );
};

export default Filter;
