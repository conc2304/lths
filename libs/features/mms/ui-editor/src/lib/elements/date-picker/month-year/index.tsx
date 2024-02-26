import React, { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { ArrowDropDown, ArrowDropUp, Clear } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { clamp, isAfter, isBefore, getYear, getMonth } from 'date-fns';

import { MonthAndYear } from '../../../core/components/types';

type MonthYearPickerProps = {
  label?: string;
  value: MonthAndYear | null;
  onChange: (value: MonthAndYear | null) => void;
  maxDate?: Date;
  minDate?: Date;
  clearable?: boolean;
};

const MonthYearPicker = ({ label, value, onChange, maxDate, minDate, clearable = false }: MonthYearPickerProps) => {
  const [open, setOpen] = useState(false);

  const dateValue = value ? new Date(value.year, value.month) : value;

  const handleChange = (value: Date) => {
    let result = value;
    if(minDate && maxDate) {
      result = clamp(value, {
        start: minDate,
        end: maxDate,
      })
    } else if (minDate) {
      result = isBefore(value, minDate) ? minDate : value;
    } else if (maxDate) {
      result = isAfter(value, maxDate) ? maxDate : value;
    }

    const newMonth = getMonth(result);
    const newYear = getYear(result);

    onChange({ month: newMonth, year: newYear });
  };

  const handleClear = (e) => {
    e.preventDefault();
    onChange(null);
  };

  return (
    <DatePicker 
      label={label}
      value={dateValue} onChange={handleChange}
      maxDate={maxDate} minDate={minDate}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      views={['year', 'month']} 
      slotProps={{ 
        field: { readOnly: true },
        textField: {
          fullWidth: true,
          variant: 'outlined',
          onClick: () => setOpen(!open),
          sx: {
            margin: 0,
            ...(clearable && {
              '&:hover .clearDateButton': { visibility: 'visible' },
              '& .Mui-focused .clearDateButton': { visibility: 'visible' },
            }),
          },
          InputProps: {
            endAdornment: (
              <InputAdornment position="end" sx={{ marginRight: '-7px' }}>
                {(dateValue && clearable) &&
                  <IconButton
                    className='clearDateButton'
                    sx={{ 
                      width: '28px', height: '28px', 
                      visibility: open ? 'visible' : 'hidden',
                    }}
                    onClick={handleClear}
                    children={<Clear fontSize="small"/>}
                  />
                }
                <IconButton 
                  sx={{ width: '28px', height: '28px' }}
                  onClick={() => setOpen(!open)}
                >
                  {open ? <ArrowDropUp/> : <ArrowDropDown/>}
                </IconButton>
              </InputAdornment>
            ),
          },
        }
      }}
    />
  );
};

export default MonthYearPicker;
