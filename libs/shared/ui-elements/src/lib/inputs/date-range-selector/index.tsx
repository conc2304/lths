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

type DateRange = {
  startDate: DateValue;
  endDate: DateValue;
};

type DateValue = string | number | Date | null;

type Props = {
  dateOptions: DateFilterOption;
  onChange: ({ startDate, endDate }: DateRange) => void;
};

export const DateRangeSelector = ({
  dateOptions,
  onChange,
}: Props): JSX.Element => {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<DateValue>(null);
  const [tempStartDate, setTempStartDate] = useState<DateValue>(null);
  const [endDate, setEndDate] = useState<DateValue>(null);
  const [tempEndDate, setTempEndDate] = useState<DateValue>(null);
  const [dateOptionGroupValue, setDateOptionGroupValue] = useState<
    string | number | null
  >(null);
  const [pickerKey, setPickerKey] = useState<number>(98765);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const onClose = () => {
    // set a new key value to force the cancel to
    setPickerKey(Math.floor(Math.random() * 20));
  };

  const onOptionSelected = (
    event: React.MouseEvent<HTMLElement>,
    selectedValue: string
  ) => {
    setDateOptionGroupValue(selectedValue);
    setStartDate(null);
    setEndDate(null);
    setTempStartDate(null);
    setTempEndDate(null);

    onChange({
      startDate: selectedValue,
      endDate: currentDate,
    });
  };

  const onDatePickerAccepted = (value: DateValue, range: 'start' | 'end') => {
    setDateOptionGroupValue(null);

    console.log('onDatePickerAccepted');

    if (range === 'start') setStartDate(value);
    if (range === 'end') setEndDate(value);
    if (startDate && endDate) onChange({ startDate, endDate });
  };

  return (
    <Container className="LthsDateRangeSelector-root">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid
          container
          sx={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}
        >
          <Grid
            md="auto"
            xs={12}
            sx={{ m: (theme: Theme) => `${theme.spacing(0.5)} 0` }}
          >
            <ToggleButtonGroup
              value={dateOptionGroupValue}
              onChange={onOptionSelected}
              exclusive
              aria-label="Predifinded Date Range Fiter"
              sx={{
                flexWrap: 'wrap',
              }}
            >
              {dateOptions.map((option) => {
                const { value, label } = option;
                return (
                  <ToggleButton
                    value={value}
                    key={value}
                    aria-label={label}
                    aria-selected={value === dateOptionGroupValue}
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
                m: (theme: Theme) => `0 ${theme.spacing(2)}`,
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
              m: (theme: Theme) => `${theme.spacing(0.5)} 0`,
            }}
          >
            <Grid container>
              <Grid md={6} xs={6}>
                <DatePicker
                  key={pickerKey + 1}
                  label="START"
                  disableFuture
                  value={tempStartDate || startDate || null}
                  onAccept={(value: DateValue) =>
                    onDatePickerAccepted(value, 'end')
                  }
                  onChange={(value: DateValue) => {
                    onDatePickerAccepted(value, 'start');
                  }}
                  onClose={() => {
                    onClose();
                    setTempStartDate(null);
                  }}
                  maxDate={endDate || currentDate || undefined}
                  sx={{ ml: 0 }}
                />
              </Grid>
              <Grid md={6} xs={6}>
                <DatePicker
                  key={pickerKey}
                  label="END"
                  disableFuture
                  value={tempEndDate || endDate || null}
                  onAccept={(value: DateValue) =>
                    onDatePickerAccepted(value, 'end')
                  }
                  onChange={(value: DateValue) => {
                    setTempEndDate(value);
                  }}
                  onClose={() => {
                    onClose();
                    setTempEndDate(null);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Container>
  );
};
