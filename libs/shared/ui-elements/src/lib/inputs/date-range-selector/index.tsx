import { useState } from 'react';
import {
  Container,
  Divider,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DateFilterOption } from 'libs/shared/ui-elements/src/lib/inputs/date-range-selector/types';
import { addDays, isBefore } from 'date-fns';

type DateRange = {
  startDate: Date;
  endDate: Date;
};

type Props = {
  dateOptions: DateFilterOption;
  onChange: ({ startDate, endDate }: DateRange) => void;
};

export const DateRangeSelector = ({
  dateOptions,
  onChange,
}: Props): JSX.Element => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [dateOptionGroupValue, setDateOptionGroupValue] = useState<Date | null>(
    null
  );
  const [pickerKey, setPickerKey] = useState<number>(98765);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const setNewPickerKey = () => {
    // set a new key value to force the cancel to
    setPickerKey(Math.floor(Math.random() * 20));
  };

  const onOptionSelected = (
    event: React.MouseEvent<HTMLElement>,
    selectedValue: Date
  ) => {
    const updatedDateTime = new Date();
    setCurrentDateTime(updatedDateTime);

    setDateOptionGroupValue(selectedValue);
    setStartDate(null);
    setEndDate(null);
    setTempStartDate(null);
    setTempEndDate(null);
    setNewPickerKey();

    onChange({
      startDate: selectedValue,
      endDate: updatedDateTime,
    });
  };

  const onDatePickerAccepted = (value: Date | null, range: 'start' | 'end') => {
    setDateOptionGroupValue(null);
    let start = startDate;
    let end = endDate;
    if (range === 'start') {
      setStartDate(value);
      start = value;
    } else if (range === 'end') {
      setEndDate(value);
      end = value;
    }
    if (start && end && isBefore(start, end))
      // date selection defaults to start of day,
      // to include the day selected in the data add 1 day
      onChange({ startDate: start, endDate: addDays(end, 1) });
  };

  const onDatePickerClose = () => {
    setNewPickerKey();
    setTempEndDate(null);
  };

  return (
    <Container className="LthsDateRangeSelector-root">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid
            md="auto"
            xs={12}
            sx={{ m: (theme: Theme) => theme.spacing(0.5, 0) }}
          >
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
                const { value, label } = option;
                return (
                  <ToggleButton
                    role="button"
                    value={value}
                    key={value.toString()}
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
                m: (theme: Theme) => theme.spacing(2, 0.25),
              }}
            />
          )}
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
            <Grid container>
              <Grid md={6} xs={6}>
                <DatePicker
                  key={pickerKey + 1}
                  label="START"
                  disableFuture
                  value={tempStartDate || startDate || null}
                  onAccept={(value: Date | null) =>
                    onDatePickerAccepted(value, 'start')
                  }
                  onChange={setTempStartDate}
                  onClose={onDatePickerClose}
                  maxDate={endDate || currentDateTime || undefined}
                  sx={{ ml: 0 }}
                  className="Lths-Date-Picker"
                />
              </Grid>
              <Grid md={6} xs={6}>
                <DatePicker
                  key={pickerKey}
                  label="END"
                  disableFuture
                  value={tempEndDate || endDate || null}
                  onAccept={(value: Date | null) =>
                    onDatePickerAccepted(value, 'end')
                  }
                  onChange={setTempEndDate}
                  onClose={onDatePickerClose}
                  className="Lths-Date-Picker"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Container>
  );
};
