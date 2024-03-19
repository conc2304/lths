import { FocusEventHandler, MouseEventHandler, useState } from 'react';
import { Box, Button, ClickAwayListener, FormControl, InputAdornment, Paper, Popper } from '@mui/material';
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
  const { value, onChange, onBlur, error, helperText, placeholder, label, mode, minDate, onAddTime } = props;

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
  const shrinkLabel = !!value || !!datePickerFocused || (error !== undefined && helperText !== 'Required');

  const handleCloseDatePicker = () => setDatePickerOpen(false);
  const handleOpenDatePicker = () => setDatePickerOpen(true);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }} data-testid="Date-Picker--root">
      <ClickAwayListener onClickAway={handleCloseDatePicker}>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
          <DatePicker
            value={value}
            onChange={handleDateChange}
            open={datePickerOpen}
            onOpen={handleOpenDatePicker}
            onAccept={handleCloseDatePicker}
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
                size: 'small',
                onFocus: () => setDatePickerFocused(true),
                onBlurCapture: () => {
                  setDatePickerFocused(false);
                },
                focused: datePickerFocused,
                error: error,
                helperText: helperText,

                // input adornment position start messes with the the label shrinking, so forcing the label shrinking here
                InputLabelProps: {
                  focused: datePickerFocused,
                  shrink: shrinkLabel,
                  sx: { ml: shrinkLabel ? 0 : 4.75, transition: 'all 0.15s ease-in' }, // move the label text beyond the start icon
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
          {mode === 'date' && (
            <Button variant="text" sx={{ ml: 1, mt: 1.25 }} onClick={onAddTime}>
              Add Time
            </Button>
          )}
        </Box>
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
                size="small"
                slotProps={{
                  textField: {
                    label: label?.replace('date', 'time'),
                    placeholder: placeholder?.replace('date', 'time'),
                    helperText: helperText ? ' ' : undefined, // keep the inputs inline
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
