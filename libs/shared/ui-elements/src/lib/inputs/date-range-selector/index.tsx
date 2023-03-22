import { useState } from 'react';
import { Container, Divider, Theme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useMediaQuery from '@mui/material/useMediaQuery';

import { LthsButtonGroup } from 'libs/shared/ui-elements/src';
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
  const [endDate, setEndDate] = useState<DateValue>(null);
  const [dateOptionGroupValue, setDateOptionGroupValue] = useState<
    string | number | null
  >(null);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const onOptionSelected = (value: string | number) => {
    setDateOptionGroupValue(value);
    setStartDate(null);
    setEndDate(null);

    onChange({
      startDate: value,
      endDate: currentDate,
    });
  };

  const onDatePickerAccepted = (value: DateValue, temp: 'start' | 'end') => {
    setDateOptionGroupValue(null);

    if (temp === 'start') setStartDate(value);
    if (temp === 'end') setEndDate(value);

    if (startDate && endDate) onChange({ startDate, endDate });
  };

  return (
    <Container className="LthsDateRangeSelector-root">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container sx={{display: 'flex', alignItems: 'center', alignContent: 'center'}}>
          <Grid md="auto" xs={12}>
            <LthsButtonGroup
              buttons={dateOptions}
              value={dateOptionGroupValue}
              onOptionSelected={onOptionSelected}
              sx={{ pl: 0, pr: 0 }}
            />
          </Grid>
          {!isSmallScreen && (
            <Divider 
              orientation="vertical"
              variant="middle"
              sx={{ height: '35px', m: '0 18px 0 20px'}}
            />
          )}
          <Grid
            md="auto"
            xs={12}
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid container>
              <Grid md={6} xs={6}>
                <DatePicker
                  label="START"
                  disableFuture
                  value={startDate}
                  onAccept={(value: DateValue) => {
                    onDatePickerAccepted(value, 'start');
                  }}
                  maxDate={endDate || currentDate || undefined}
                  sx={{ ml: 0 }}
                />
              </Grid>
              <Grid md={6} xs={6}>
                <DatePicker
                  label="END"
                  disableFuture
                  value={endDate}
                  onAccept={(value: DateValue) => {
                    onDatePickerAccepted(value, 'end');
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
