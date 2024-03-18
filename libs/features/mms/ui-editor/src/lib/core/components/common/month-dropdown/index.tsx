import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type MonthDropDownToolbarProps = {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
};
const MonthDropDownToolbar = ({ value, onChange }: MonthDropDownToolbarProps) => {
  const months = [
    { text: 'January', value: '1' },
    { text: 'February', value: '2' },
    { text: 'March', value: '3' },
    { text: 'April', value: '4' },
    { text: 'May', value: '5' },
    { text: 'June', value: '6' },
    { text: 'July', value: '7' },
    { text: 'August', value: '8' },
    { text: 'September', value: '9' },
    { text: 'October', value: '10' },
    { text: 'November', value: '11' },
    { text: 'December', value: '12' },
  ];

  return (
    <Select value={value} onChange={onChange} label="Months" defaultValue={null}>
      {months.map((month, index) => (
        <MenuItem key={index} value={month.value}>
          {month.text}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MonthDropDownToolbar;
