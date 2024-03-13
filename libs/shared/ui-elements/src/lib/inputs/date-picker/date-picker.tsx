import { FocusEventHandler } from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker, DatePickerSlotsComponentsProps, DigitalClock } from '@mui/x-date-pickers';

type OnDateChageFn = ((value: Date | null) => void) | undefined;
type DatePickerLTHSProps = {
  value: Date | null;
  onChange?: OnDateChageFn;
  mode: 'date' | 'datetime';
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  onAddTime?: () => void;
};
export const DatePickerLTHS = (props: DatePickerLTHSProps) => {
  const { value, onChange, onBlur, error, helperText, placeholder, mode } = props;

  const datePickerSlotProps: DatePickerSlotsComponentsProps<Date> = {
    textField: {
      required: false,
      variant: 'outlined',
      size: 'small',

      sx: {
        '&.MuiTextField-root': {
          marginRight: 'unset',
          marginTop: 'unset',
          // mb: ,
        },
        '& .MuiInputBase-inputSizeSmall': {
          // ...fontStyle,
        },
      },
    },
  };

  const handleTimeChange: OnDateChageFn = (value) => {
    // do something with value
    // get the time from the value,
    // update the value with this time
    onChange && onChange(value);
  };

  const handleDateChange: OnDateChageFn = (value) => {
    // do something with value
    onChange && onChange(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', alignContent: 'center' }}>
      <DatePicker
        value={value}
        onChange={handleDateChange}
        slots={{
          openPickerIcon: CalendarTodayIcon,
        }}
        slotProps={{
          textField: {
            ...datePickerSlotProps.textField,
            placeholder: placeholder,
            onBlur: onBlur,
            error: error,
            helperText: helperText,
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowDropDownIcon />
                </InputAdornment>
              ),
            },
          },
          inputAdornment: {
            position: 'start',
          },
          openPickerButton: {
            size: 'small',
          },
        }}
      />
      {mode === 'datetime' && (
        // have clicking on input value open the digital clock modal
        <DigitalClock
          value={new Date()}
          onChange={handleTimeChange}
          defaultValue={new Date()}
          timeStep={15}
          // minTime={}
          // maxTime={}
          skipDisabled
          timezone="PST"
        />
      )}
    </Box>
  );
};
