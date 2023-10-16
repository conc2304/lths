import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format, isValid } from 'date-fns';

import { PageDetail } from '@lths/features/mms/data-access';
import { useEditorActions } from '@lths/features/mms/ui-editor';
import { ordinalifyNumber } from '@lths/shared/ui-elements';

import { EventItem } from '../types';
import { findEventConstraintType, formatDateTime } from '../utils';

export type DateRange = {
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
};

type Props = {
  onDateRangeSelect?: (dateRange: DateRange[]) => void;
};
//TODO: This logic is flimsy, rewrite this component
const DateTimeRangePicker = ({ onDateRangeSelect }: Props) => {
  const { data } = useEditorActions();
  const page_data = data as PageDetail;
  const {
    constraints: { events: eventConstraints },
  } = page_data;

  const today = new Date();

  const [dateRange, setDateRange] = useState<DateRange[]>([
    {
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
    },
  ]);

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setDateRange((prevState) => {
      const ranges = [...prevState];
      ranges[index] = {
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
      };
      return ranges;
    });
  }, [index]);

  useEffect(() => {
    onDateRangeSelect(dateRange);
  }, [dateRange]);

  useEffect(() => {
    const constraintType =
      eventConstraints.length === 0 ? EventItem.SPECIFIC_DATE_TIME : findEventConstraintType(eventConstraints);
    if (constraintType === EventItem.SPECIFIC_DATE_TIME) setDateRange(eventConstraints.map((ec) => formatDateTime(ec)));
  }, [eventConstraints]);

  const handleChange = (key, value) => {
    console.log('🚀 ~ file: date-time-range-picker.tsx:72 ~ handleChange ~ isValid(value):', isValid(value));
    if (!isValid(value)) return;
    const ranges =
      dateRange.length === 0
        ? [
            {
              startDate: null,
              startTime: null,
              endDate: null,
              endTime: null,
            },
          ]
        : [...dateRange];

    ranges[index][key] = value;

    setDateRange(ranges);
  };

  const formatDate = (date: Date) => {
    return date ? format(date, 'MMM do, yyyy') : '';
  };

  const formatTime = (date: Date) => {
    return date ? format(date, 'hh:mm a') : '';
  };

  const { startDate, startTime, endDate, endTime } = dateRange[index] || {};

  const handleAddNewRange = () => {
    if (startDate) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleRemoveDateRange = (index: number) => {
    setDateRange((prevState) => {
      const ranges = [...prevState];
      ranges.splice(index, 1);
      setIndex(ranges.length > 0 ? ranges.length - 1 : 0);

      return ranges;
    });
  };

  const addedRanges = dateRange.length > 0 ? dateRange.slice(0, -1) : [];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {addedRanges.map((item, index) => (
        <Box key={index}>
          <Typography>{ordinalifyNumber(index + 1)} date/time range</Typography>
          <Typography>
            {formatDate(item?.startDate)} | {formatTime(item?.startTime)} thru
          </Typography>
          <Typography>
            {formatDate(item?.endDate)} | {formatTime(item?.endTime)}
          </Typography>
          <Button
            variant="text"
            sx={{ color: '#0091FF', padding: 0, marginTop: 1.25 }}
            onClick={() => handleRemoveDateRange(index)}
          >
            DELETE
          </Button>
        </Box>
      ))}
      <Grid marginTop={2}>
        <Typography>START DATE/TIME</Typography>
        <DatePicker
          label="Select date"
          value={startDate}
          minDate={today}
          onChange={(value) => handleChange('startDate', value)}
        />
        <TimePicker
          label="Select time"
          value={startTime}
          onChange={(value) => handleChange('startTime', value)}
          disabled={Boolean(!startDate)}
        />
      </Grid>
      <Grid marginTop={2}>
        <Typography>END DATE/TIME</Typography>
        <DatePicker
          label="Select date"
          minDate={startDate || today}
          value={endDate}
          onChange={(value) => handleChange('endDate', value)}
        />
        <TimePicker
          label="Select time"
          value={endTime}
          onChange={(value) => handleChange('endTime', value)}
          disabled={Boolean(!endDate)}
        />
      </Grid>
      <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6D7278' }} marginTop={2}>
        Do not enter an end date to keep this page published until otherwise noted.
      </Typography>
      <div>
        <Button variant="text" sx={{ color: '#0091FF', padding: 0, marginTop: 2 }} onClick={handleAddNewRange}>
          ADD ANOTHER DATE/TIME RANGE
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default DateTimeRangePicker;
