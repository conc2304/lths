import { FocusEventHandler, MouseEventHandler, useState } from 'react';
import { Box, ClickAwayListener, FormControl, InputAdornment, Paper, Popper } from '@mui/material';
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
  minDate?: Date;
};
export const DatePickerLTHS = (props: DatePickerLTHSProps) => {
  const { value, onChange, onBlur, error, helperText, placeholder, mode, minDate } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [timePickerFocused, setTimePickerFocused] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const datePickerSlotProps: DatePickerSlotsComponentsProps<Date> = {
    textField: {
      required: false,
      variant: 'outlined',
      size: 'small',
      sx: {
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
    console.log('handleTimeChange', value);
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
          // minDate={minDate}
          slots={{
            openPickerIcon: CalendarTodayIcon,
          }}
          slotProps={{
            inputAdornment: {
              position: 'start',
            },
            openPickerButton: {
              size: 'small',
              onClick: () => setDatePickerOpen(!datePickerOpen),
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
                focused={timePickerFocused}
                slotProps={{
                  textField: {
                    ...datePickerSlotProps.textField,
                    placeholder: placeholder?.replace('date', 'time'),
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
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
              sx={{ zIndex: (theme) => theme.zIndex.modal }}
            >
              {/* paper and box combo to force round borders over the scrollbar's hard corners */}
              <Paper
                sx={{
                  borderRadius: '0.25rem',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ overflowY: 'auto' }}>
                  <DigitalClock
                    value={value}
                    onChange={handleTimeChange}
                    defaultValue={new Date()}
                    slotProps={{}}
                    timeStep={15}
                    minTime={minDate}
                    // maxTime={}
                    skipDisabled
                    timezone="PST"
                    sx={{
                      width: timePickerWidth,
                    }}
                  />
                </Box>
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};
