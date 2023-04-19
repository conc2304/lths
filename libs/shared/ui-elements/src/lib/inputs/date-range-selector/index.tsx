import { useState } from 'react';
import { Box, Button, Divider, Theme, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DateFilterOption } from 'libs/shared/ui-elements/src/lib/inputs/date-range-selector/types';
import { addDays, endOfDay, isBefore, isSameDay, startOfDay } from 'date-fns';
import { slugify } from '@lths/shared/utils';

type DateRange = {
  startDate: Date;
  endDate: Date;
};

type Props = {
  dateOptions: DateFilterOption;
  onChange: ({ startDate, endDate }: DateRange) => void;
};

export const DateRangeSelector = ({ dateOptions, onChange }: Props): JSX.Element => {
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
      const match = getMatchingPresetValue({ startDate: _startDate, endDate: _endDate });
      const dateValueOption = !!match ? slugify(match?.label as string) : null;
      setDateOptionGroupValue(dateValueOption);
    }

    const isDateRangeValid = !!_startDate && !!_endDate && isBefore(_startDate, _endDate);
    setIsDateRangeValid(isDateRangeValid);
  };

  const getMatchingPresetValue = (dateRange: DateRange) => {
    const { startDate, endDate } = dateRange;
    return dateOptions.find(({ dateRange }) => {
      const { startDate: optionStartDate, endDate: optionEndDate } =
        typeof dateRange === 'function' ? dateRange() : dateRange;

      return isSameDay(startDate, optionStartDate) && isSameDay(endDate, optionEndDate);
    });
  };

  const handleOnToggleClick = (dateRange: (() => DateRange) | DateRange) => {
    const { startDate, endDate } = typeof dateRange === 'function' ? dateRange() : dateRange;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onDatePickerClose = () => {
    setNewPickerKey();
    setTempEndDate(null);
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
                  key={pickerKey + 1}
                  label="START"
                  disableFuture
                  value={tempStartDate || startDate || null}
                  onAccept={(value: Date | null) => onDatePickerAccepted(value, 'start')}
                  onChange={setTempStartDate}
                  onClose={onDatePickerClose}
                  minDate={minDate}
                  maxDate={endDate || currentDateTime || undefined}
                  sx={{ ml: 0 }}
                  className="Lths-Date-Picker"
                />
              </Grid>
              {/* Date Pickers Grid Item - End */}
              <Grid md={4} xs={4} sx={{ height: '34px' }}>
                <DatePicker
                  key={pickerKey}
                  label="END"
                  disableFuture
                  minDate={minDate}
                  maxDate={maxEndDate}
                  value={tempEndDate || endDate || null}
                  onAccept={(value: Date | null) => onDatePickerAccepted(value, 'end')}
                  onChange={setTempEndDate}
                  onClose={onDatePickerClose}
                  className="Lths-Date-Picker"
                  sx={{ mb: 0.75 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              color="secondary"
              disabled={!isDateRangeValid}
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
