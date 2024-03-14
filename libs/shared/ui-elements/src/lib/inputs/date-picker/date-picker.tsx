import { FocusEventHandler, MouseEventHandler, useState } from 'react';
import { Box, ClickAwayListener, FormControl, InputAdornment, Paper, Popper, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker, DatePickerSlotsComponentsProps, DigitalClock, TimeField } from '@mui/x-date-pickers';

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
  // const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [timePickerFocused, setTimePickerFocused] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const defaultTime = value ? new Date(value) : new Date();
  defaultTime.setHours(12, 0, 0);

  console.log(defaultTime);
  // const time = value.get
  const datePickerSlotProps: DatePickerSlotsComponentsProps<Date> = {
    textField: {
      required: false,
      variant: 'outlined',
      size: 'small',

      sx: {
        ':root': {
          // padding: '20px',
          color: 'blue',
        },
        '&.MuiTextField-root': {
          marginRight: 'unset',
          marginTop: 'unset',
          // color: 'red',
          // marginTop: '200px',
          // mb: ,
        },
        '&.MuiInputBase-root': {
          color: 'orange',
          fontSize: '1rem',
          fontWeight: '400',
          lineHeight: '1.5rem',
          letterSpacing: '0.15px',
        },
      },
    },
  };

  const handleTimeChange: OnDateChageFn = (value) => {
    // do something with value
    // get the time from the value,
    // update the value with this time
    onChange && onChange(value);
    setAnchorEl(null);
    setTimePickerFocused(true);
  };

  const handleDateChange: OnDateChageFn = (value) => {
    // do something with value
    onChange && onChange(value);
  };

  const handleClick: MouseEventHandler<HTMLDivElement> | undefined = (event) => {
    setTimePickerFocused(!timePickerFocused);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setTimePickerFocused(false);
    setAnchorEl(null);
  };
  const timePickerWidth = '130px';
  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
      <ClickAwayListener onClickAway={() => setDatePickerOpen(false)}>
        <DatePicker
          value={value}
          onChange={handleDateChange}
          open={datePickerOpen}
          onOpen={() => setDatePickerOpen(true)}
          slots={{
            openPickerIcon: CalendarTodayIcon,
          }}
          slotProps={{
            inputAdornment: {
              position: 'start',
            },
            openPickerButton: {
              size: 'small',
            },
            textField: {
              ...datePickerSlotProps.textField,
              sx: { width: '185px' },
              placeholder: placeholder,
              onBlur: onBlur,
              error: error,
              helperText: helperText,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Box onClick={() => setDatePickerOpen(!datePickerOpen)}>
                      <ArrowDropDownIcon />
                    </Box>
                  </InputAdornment>
                ),
              },
            },
          }}
        />
      </ClickAwayListener>

      {mode === 'datetime' && (
        // have clicking on input value open the digital clock modal
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box>
            {/* <Box> */}
            <FormControl sx={{ margin: '0.5rem 0 0.25rem 0.5rem' }}>
              <TimeField
                value={value}
                readOnly
                onClick={handleClick}
                // onFocus={handleFocus}
                focused={timePickerFocused}
                defaultValue={defaultTime}
                slotProps={{
                  textField: {
                    ...datePickerSlotProps.textField,
                    InputProps: {
                      sx: { width: timePickerWidth },
                      endAdornment: (
                        <InputAdornment position="end">
                          <ArrowDropDownIcon />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </FormControl>
            {/* </Box> */}
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
              sx={{ zIndex: (theme) => theme.zIndex.modal + 500 }}
            >
              <Paper>
                <DigitalClock
                  value={new Date()}
                  onChange={handleTimeChange}
                  defaultValue={new Date()}
                  slotProps={{}}
                  timeStep={15}
                  // minTime={}
                  // maxTime={}
                  skipDisabled
                  timezone="PST"
                  sx={{
                    width: timePickerWidth,
                  }}
                />
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};
