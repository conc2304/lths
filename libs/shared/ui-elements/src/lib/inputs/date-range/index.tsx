import { Container, Divider } from '@mui/material';
import { LthsButtonGroup } from 'libs/shared/ui-elements/src';
import { DateFilterOption } from 'libs/shared/ui-elements/src/lib/inputs/date-range/types';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type Props = {
  dateOptions: DateFilterOption;
  onChange: () => void;
};
type DateValue = string | number | Date | null;

export const DateRangeInput = ({
  dateOptions,
  onChange,
}: Props): JSX.Element => {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<DateValue>(null);
  const [endDate, setEndDate] = useState<DateValue>(null);
  const [dateOptionGroupValue, setDateOptionGroupValue] = useState<
    string | number | null
  >(null);

  const onOptionSelected = (value: string | number) => {
    console.log('onOptionSelected', value);
    setDateOptionGroupValue(value);
    setStartDate(null);
    setEndDate(null);

    onChange();
  };

  const onDatePickerAccepted = (value: DateValue, temp: 'start' | 'end') => {
    console.log('onDatePickerAccepted', value);
    setDateOptionGroupValue(null);

    if (temp === 'start') setStartDate(value);
    if (temp === 'end') setEndDate(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <LthsButtonGroup
          buttons={dateOptions}
          value={dateOptionGroupValue}
          onOptionSelected={onOptionSelected}
        />
        <Divider orientation="vertical" flexItem />
        <DatePicker
          label="Start"
          disableFuture
          value={startDate}
          onAccept={(value: DateValue) => {
            onDatePickerAccepted(value, 'start');
          }}
          maxDate={endDate || currentDate || undefined}
        />
        <DatePicker
          label="End"
          disableFuture
          value={endDate}
          onAccept={(value: DateValue) => {
            onDatePickerAccepted(value, 'end');
          }}
        />
      </Container>
    </LocalizationProvider>
  );
};
