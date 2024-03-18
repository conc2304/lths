import { FocusEventHandler, MouseEventHandler, useState } from 'react';
import { Box, ClickAwayListener, FormControl, InputAdornment, Paper, Popper } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker, DigitalClock, TimeField } from '@mui/x-date-pickers';
import { isValid } from 'date-fns';

type OnDateChageFn = ((value: Date | null) => void) | undefined;
type DatePickerLTHSProps = {
  value: Date | null;
  onChange?: OnDateChageFn;
  mode: 'date' | 'datetime';
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  onAddTime?: () => void;
  minDate?: Date;
};
export const DatePickerLTHS = (props: DatePickerLTHSProps) => {
  const { value, onChange, onBlur, error, helperText, placeholder, label, mode, minDate } = props;

  const [timePickerFocused, setTimePickerFocused] = useState(false);
  const [datePickerFocused, setDatePickerFocused] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openTimePicker = Boolean(anchorEl);
  const timePickerWidth = '8.125rem';

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

  const handleDatePickerBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (value) => {
    setDatePickerFocused(false);
    onBlur && onBlur(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
      <ClickAwayListener onClickAway={() => setDatePickerOpen(false)}>
        <DatePicker
          value={value}
          onChange={handleDateChange}
          open={datePickerOpen}
          onOpen={() => setDatePickerOpen(true)}
          label={label}
          // intentionally not setting minDate for datePicker
          // to allow users to more easily change dates,
          // having parent components handle the date/error validation
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
              sx: { width: '11.5rem' },
              onBlur: handleDatePickerBlur,
              onFocus: () => setDatePickerFocused(true),
              error: error,
              helperText: helperText,
              // input adornment position start messes with the the label shrinking, so forcing the label shrinking here
              InputLabelProps: {
                shrink: !!value || !!datePickerFocused || error !== undefined,
                sx: { ml: !!value || !!datePickerFocused || error !== undefined ? undefined : 4.75 }, // move the label text beyond the start icon
              },
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      onClick={() => setDatePickerOpen(!datePickerOpen)}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
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
                value={isValid(value) ? value : null}
                readOnly
                onClick={handleClick}
                focused={timePickerFocused}
                slotProps={{
                  textField: {
                    label: label?.replace('date', 'time'),
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
              open={openTimePicker}
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
