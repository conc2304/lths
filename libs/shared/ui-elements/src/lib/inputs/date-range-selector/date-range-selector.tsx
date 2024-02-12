import { useEffect, useState, MouseEvent } from 'react';
import { Box, Button, Divider, Skeleton, Theme, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { endOfDay, isBefore, isSameDay, startOfDay } from 'date-fns';

import { slugify } from '@lths/shared/utils';

import { DateFilterOptions, DateRange } from '../../ui-filters';

type Props = {
  dateOptions: DateFilterOptions;
  onUpdateTimePeriod: (dateRange: DateRange) => void;
  onChange: (dateRange: DateRange) => void;
  value: DateRange;
  minDate?: Date;
  maxEndDate?: Date;
  datePickerStartProps?: DatePickerProps<any>;
  datePickerEndProps?: DatePickerProps<any>;
  isLoading?: boolean;
};

export const DateRangeSelector = ({
  dateOptions,
  onUpdateTimePeriod,
  value,
  minDate,
  maxEndDate,
  onChange: handleOnChange,
  datePickerStartProps,
  datePickerEndProps,
  isLoading = false,
}: Props): JSX.Element => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const end_date = !value ? null : typeof value.end_date === 'string' ? new Date(value.end_date) : value.end_date;
  const start_date = !value
    ? null
    : typeof value.start_date === 'string'
    ? new Date(value.start_date)
    : value.start_date;

  const [dateOptionGroupValue, setDateOptionGroupValue] = useState<string | null>(null);
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  // Temp Dates + Picker Key are a fix/hack for a bug in the mobile version of the Mui DatePicker
  // Temp Dates reset dates to what they were before if a user cancels their selection
  // PickerKey forces a refresh of that datepicker component's state
  const [tempStartDate, setTempStartDate] = useState<Date | null>(start_date);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(end_date);
  const randomeSeed = Math.floor(Math.random() * 20);
  const [pickerKey, setPickerKey] = useState<number>(randomeSeed);
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (start_date && end_date) {
      const match = getMatchingPresetValue({ start_date, end_date });
      const dateValueOption = match ? slugify(match.label) : null;
      setDateOptionGroupValue(dateValueOption);
    }
  }, [value]);

  const setNewPickerKey = () => {
    // set a new key value to force the cancel to not change the date selected
    setPickerKey(Math.floor(Math.random() * 20));
  };

  const handleOptionSelected = (event: MouseEvent<HTMLElement>, selectedValue: string) => {
    const updatedDateTime = new Date();
    setCurrentDateTime(updatedDateTime);
    setDateOptionGroupValue(selectedValue);
    setIsDateRangeValid(true);
    setTempStartDate(null);
    setTempEndDate(null);
    setNewPickerKey();
  };

  const handleDatePickerAccepted = (inputVal: Date | null, range: 'start' | 'end') => {
    setDateOptionGroupValue(null);
    let start = start_date;
    let end = end_date;
    // TODO will need to change when date-time picker is in use
    if (range === 'start' && inputVal) {
      start = startOfDay(inputVal);
    } else if (range === 'end' && inputVal) {
      end = endOfDay(inputVal);
    }

    const isDateRangeValid = !!start && !!end && isBefore(start, end);
    setIsDateRangeValid(isDateRangeValid);

    if (isDateRangeValid && !!start && !!end) {
      handleOnChange({ start_date: start, end_date: end });
    }
  };

  const getMatchingPresetValue = (dateRange: DateRange) => {
    const { start_date, end_date } = dateRange;
    return dateOptions.find(({ dateRange }) => {
      const { start_date: optionStartDate, end_date: optionEndDate } =
        typeof dateRange === 'function' ? dateRange() : dateRange;

      if (!start_date || !end_date || !optionStartDate || !optionEndDate) return false;
      return isSameDay(start_date, optionStartDate) && isSameDay(end_date, optionEndDate);
    });
  };

  const handleOnToggleClick = (dateRange: (() => DateRange) | DateRange) => {
    const { start_date, end_date } = typeof dateRange === 'function' ? dateRange() : dateRange;
    handleOnChange({ start_date, end_date });
  };

  const onDatePickerClose = () => {
    setNewPickerKey();
    setTempEndDate(null);
  };

  const handleUpdateRange = () => {
    const { start_date, end_date } = value;
    if (start_date && end_date) onUpdateTimePeriod({ start_date, end_date });
  };

  return (
    <Box className="LthsDateRangeSelector-root">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* Main Grid Container*/}
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Main Grid Item -- Toggle Buttons */}
          <Grid md="auto" xs={12} sx={{ m: (theme: Theme) => theme.spacing(0.5, 0) }}>
            {isLoading ? (
              <Skeleton variant="rounded" width={300} height={35} />
            ) : (
              <ToggleButtonGroup
                value={dateOptionGroupValue}
                onChange={handleOptionSelected}
                exclusive
                aria-label="Predifinded Date Range Filter"
                sx={{
                  flexWrap: 'wrap',
                }}
                className="Lths-Button-Group"
              >
                {dateOptions &&
                  dateOptions.map((option) => {
                    const { label, dateRange } = option;
                    const value = slugify(label);
                    return (
                      <ToggleButton
                        role="button"
                        value={value}
                        key={value}
                        onClick={() => {
                          handleOnToggleClick(dateRange);
                        }}
                        aria-label={label}
                        aria-pressed={value === dateOptionGroupValue}
                      >
                        {label}
                      </ToggleButton>
                    );
                  })}
              </ToggleButtonGroup>
            )}
          </Grid>
          {!isSmallScreen && (
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{
                height: '2.118rem',
                m: (theme: Theme) => theme.spacing(2, 2.5),
              }}
            />
          )}
          {/* Main Grid Item - Date Pickers Column */}
          <Grid
            md="auto"
            xs={12}
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              m: (theme: Theme) => theme.spacing(0.5, 0),
            }}
          >
            {/* Date Pickers Grid Container */}

            {/* pb to account for the additional hight of the placeholder label for better centering */}
            <Grid container pb={0.5}>
              {/* Date Pickers Grid Item - Start */}

              <Grid md={6} xs={6}>
                <DatePicker
                  className="Lths-Date-Picker"
                  disabled={isLoading}
                  disableFuture
                  key={pickerKey + 1}
                  label="START"
                  maxDate={end_date || currentDateTime || undefined}
                  minDate={minDate}
                  onAccept={(value: Date | null) => handleDatePickerAccepted(value, 'start')}
                  onChange={setTempStartDate}
                  onClose={onDatePickerClose}
                  sx={{ ml: 0 }}
                  value={tempStartDate || start_date || null}
                  {...datePickerStartProps}
                />
              </Grid>
              {/* Date Pickers Grid Item - End */}
              <Grid md={4} xs={4} sx={{ height: '34px' }}>
                <DatePicker
                  className="Lths-Date-Picker"
                  disabled={isLoading}
                  disableFuture
                  key={pickerKey}
                  label="END"
                  maxDate={maxEndDate}
                  minDate={minDate}
                  onAccept={(value: Date | null) => handleDatePickerAccepted(value, 'end')}
                  onChange={setTempEndDate}
                  onClose={onDatePickerClose}
                  sx={{ mb: 0.75 }}
                  value={tempEndDate || end_date || null}
                  {...datePickerEndProps}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              color="secondary"
              disabled={!isDateRangeValid || isLoading}
              onClick={handleUpdateRange}
              sx={{ fontSize: '0.688rem', height: '2.188rem', ml: 3.5 }}
            >
              UPDATE PERIOD
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
};
