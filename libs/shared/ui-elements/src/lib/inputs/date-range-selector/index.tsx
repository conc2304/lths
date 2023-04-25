import { useState } from 'react';
import { Box, Button, Divider, Theme, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DateFilterOption } from 'libs/shared/ui-elements/src/lib/inputs/date-range-selector/types';
import { endOfDay, isBefore, isSameDay, startOfDay } from 'date-fns';
import { slugify } from '@lths/shared/utils';

type DateRange = {
  start: Date;
  end: Date;
};

type Props = {
  dateOptions: DateFilterOption;
  onChange: ({ start, end }: DateRange) => void;
  onUpdateRange: ({ start, end }: DateRange) => void;
};

export const DateRangeSelector = ({ dateOptions, onChange, onUpdateRange }: Props): JSX.Element => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [dateOptionGroupValue, setDateOptionGroupValue] = useState<string | null>(null);
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const randomeSeed = Math.floor(Math.random() * 20);
  const [pickerKey, setPickerKey] = useState<number>(randomeSeed);
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const minDate = new Date('1/1/2020'); // as per design requirements
  const maxEndDate = new Date();

  const setNewPickerKey = () => {
    // set a new key value to force the cancel to not change the date selected
    setPickerKey(Math.floor(Math.random() * 20));
  };

  const onOptionSelected = (event: React.MouseEvent<HTMLElement>, selectedValue: string) => {
    const updatedDateTime = new Date();
    setCurrentDateTime(updatedDateTime);
    setDateOptionGroupValue(selectedValue);
    setIsDateRangeValid(true);
    setTempStartDate(null);
    setTempEndDate(null);
    setNewPickerKey();
  };

  const onDatePickerAccepted = (value: Date | null, range: 'start' | 'end') => {
    setDateOptionGroupValue(null);
    let _startDate = startDate;
    let _endDate = endDate;
    if (range === 'start' && value) {
      _startDate = startOfDay(value);
      setStartDate(_startDate);
    } else if (range === 'end' && value) {
      _endDate = endOfDay(value);
      setEndDate(_endDate);
    }

    if (_startDate && _endDate) {
      const match = getMatchingPresetValue({ start: _startDate, end: _endDate });
      const dateValueOption = !!match ? slugify(match?.label as string) : null;
      setDateOptionGroupValue(dateValueOption);
    }

    const isDateRangeValid = !!_startDate && !!_endDate && isBefore(_startDate, _endDate);
    setIsDateRangeValid(isDateRangeValid);
  };

  const getMatchingPresetValue = (dateRange: DateRange) => {
    const { start, end } = dateRange;
    return dateOptions.find(({ dateRange }) => {
      const { start: optionStartDate, end: optionEndDate } = typeof dateRange === 'function' ? dateRange() : dateRange;

      return isSameDay(start, optionStartDate) && isSameDay(end, optionEndDate);
    });
  };

  const handleOnToggleClick = (dateRange: (() => DateRange) | DateRange) => {
    const { start, end } = typeof dateRange === 'function' ? dateRange() : dateRange;
    setStartDate(start);
    setEndDate(end);
  };

  const onDatePickerClose = () => {
    setNewPickerKey();
    setTempEndDate(null);
  };

  const handleUpdateRange = () => {
    if (startDate && endDate) onUpdateRange({ start: startDate, end: endDate });
  };

  return (
    <Box className="LthsDateRangeSelector-root">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* Main Grid Container*/}
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Main Grid Item -- Toggle Buttons */}
          <Grid md="auto" xs={12} sx={{ m: (theme: Theme) => theme.spacing(0.5, 0) }}>
            <ToggleButtonGroup
              value={dateOptionGroupValue}
              onChange={onOptionSelected}
              exclusive
              aria-label="Predifinded Date Range Fiter"
              sx={{
                flexWrap: 'wrap',
              }}
              className="Lths-Button-Group"
            >
              {dateOptions.map((option) => {
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
                    aria-selected={value === dateOptionGroupValue}
                    aria-pressed={value === dateOptionGroupValue}
                  >
                    {label}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
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
                  disableFuture
                  key={pickerKey + 1}
                  label="START"
                  maxDate={endDate || currentDateTime || undefined}
                  minDate={minDate}
                  onAccept={(value: Date | null) => onDatePickerAccepted(value, 'start')}
                  onChange={setTempStartDate}
                  onClose={onDatePickerClose}
                  sx={{ ml: 0 }}
                  value={tempStartDate || startDate || null}
                />
              </Grid>
              {/* Date Pickers Grid Item - End */}
              <Grid md={4} xs={4} sx={{ height: '34px' }}>
                <DatePicker
                  className="Lths-Date-Picker"
                  disableFuture
                  key={pickerKey}
                  label="END"
                  maxDate={maxEndDate}
                  minDate={minDate}
                  onAccept={(value: Date | null) => onDatePickerAccepted(value, 'end')}
                  // onChange={setTempEndDate}
                  onClose={onDatePickerClose}
                  sx={{ mb: 0.75 }}
                  value={tempEndDate || endDate || null}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              // @ts-ignore
              color="alt_button"
              disabled={!isDateRangeValid}
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
