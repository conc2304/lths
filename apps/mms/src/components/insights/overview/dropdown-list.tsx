import React from 'react';
import { SelectChangeEvent, Select, MenuItem } from '@mui/material';

export type ItemOption = { value: string; label: string };

export const DropdownList = ({
  data,
  value,
  onChange,
}: {
  data: ItemOption[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}) => {
  return (
    <Select value={value} label="" onChange={onChange} size="small">
      {data.map((o, i) => (
        <MenuItem key={`drop_down_item_${i}`} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </Select>
  );
};
