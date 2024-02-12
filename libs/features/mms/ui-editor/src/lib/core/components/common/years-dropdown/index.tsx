import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type MonthDropDownToolbarProps = {
  noOfYears: number;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
};
const YearDropDownToolbar = ({ noOfYears, value, onChange }: MonthDropDownToolbarProps) => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 1;
  const endYear = startYear + noOfYears - 1;
  const yearsArr = [];
  for (let year = startYear; year <= endYear; year++) {
    yearsArr.push(year);
  }
  console.log(yearsArr);
  return (
    <Select value={value} onChange={onChange} label="Years" defaultValue={''}>
      {yearsArr.map((year, index) => (
        <MenuItem key={index} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
};

export default YearDropDownToolbar;
