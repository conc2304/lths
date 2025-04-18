import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';

import { toast } from '@lths/shared/ui-elements';
import { ordinalifyNumber } from '@lths/shared/ui-elements';

import { colors } from '../../../common';
import { DateRangeData } from '../../types';
import { ChangeDateRange } from '../types';

const formatDate = (date: Date) => {
  return date ? format(date, 'MMM do, yyyy') : '';
};

const formatTime = (date: Date) => {
  return date ? format(date, 'hh:mm a') : '';
};

type Props = {
  onDateRangeAdd: () => void;
  onDateRangeRemove: (index: number) => void;
  onDateRangeChange: ChangeDateRange;
  selectedDateRange: DateRangeData[];
};
const DateTimeRangePicker = (props: Props) => {
  const { onDateRangeAdd, onDateRangeRemove, onDateRangeChange, selectedDateRange } = props;

  const theme = useTheme();

  const today = new Date();

  const [index, setIndex] = useState<number>(0);

  const { startDate = null, startTime = null, endDate = null, endTime = null } = selectedDateRange[index] || {};

  useEffect(() => {
    if (selectedDateRange.length > 0) setIndex(selectedDateRange.length - 1);
  }, [selectedDateRange]);

  const addedRanges = selectedDateRange.length > 0 ? selectedDateRange.slice(0, -1) : [];

  const validateAndSetEndTime = (endDateTime: Date) => {
    if (startDate && startTime && endDate) {
      const startDateTime = new Date(startDate);
      startDateTime.setHours(startTime.getHours(), startTime.getMinutes());

      if (startDateTime.toDateString() === endDateTime.toDateString() && endDateTime < startDateTime) {
        toast.add('End time cannot be before start time on the same day.', { type: 'error' });
        onDateRangeChange('endTime', new Date(startTime));
      } else {
        onDateRangeChange('endTime', endDateTime);
      }
    }
  };

  const handleEndTimeChange = (value: Date | null) => {
    if (value && startDate && startTime && endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(value.getHours(), value.getMinutes());
      validateAndSetEndTime(endDateTime);
    }
  };

  useEffect(() => {
    if (startDate && startTime && endDate && endTime) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(endTime.getHours(), endTime.getMinutes());
      validateAndSetEndTime(endDateTime);
    }
  }, [startDate, startTime, endDate, endTime, onDateRangeChange]);

  const minTimeForEndTime =
    startDate && endDate && startTime && startDate.toDateString() === endDate.toDateString()
      ? new Date(startDate.setHours(startTime.getHours(), startTime.getMinutes()))
      : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {addedRanges.map((item, index) => {
        const { startDate, startTime, endDate, endTime } = item;
        const formattedStartDate = startDate ? formatDate(startDate) : '';
        const formattedStartTime = startTime ? formatTime(startTime) : '';
        const formattedEndDate = endDate ? formatDate(endDate) : '';
        const formattedEndTime = endTime ? formatTime(endTime) : '';
        return (
          <Box key={`date_range_${index}`}>
            <Typography>{ordinalifyNumber(index + 1)} date/time range</Typography>
            <Typography>
              {formattedStartDate} | {formattedStartTime} thru
            </Typography>
            <Typography>
              {formattedEndDate} | {formattedEndTime}
            </Typography>
            <Button
              variant="text"
              sx={{ color: theme.palette.secondary.main, padding: 0, marginTop: 1.25 }}
              onClick={() => onDateRangeRemove(index)}
            >
              DELETE
            </Button>
          </Box>
        );
      })}
      <Grid marginTop={2}>
        <Typography>START DATE/TIME</Typography>
        <DatePicker
          label="Select date"
          value={startDate}
          minDate={today}
          onChange={(value) => onDateRangeChange('startDate', value)}
        />
        <TimePicker
          label="Select time"
          value={startTime}
          onChange={(value) => onDateRangeChange('startTime', value)}
          disabled={Boolean(!startDate)}
        />
      </Grid>
      <Grid marginTop={2}>
        <Typography>END DATE/TIME</Typography>
        <DatePicker
          label="Select date"
          minDate={startDate || today}
          value={endDate}
          onChange={(value) => onDateRangeChange('endDate', value)}
        />
        <TimePicker
          label="Select time"
          value={endTime}
          onChange={handleEndTimeChange}
          disabled={Boolean(!endDate)}
          minTime={minTimeForEndTime}
        />
      </Grid>
      <Typography variant="body2" sx={{ fontStyle: 'italic', color: colors.header }} marginTop={2}>
        Do not enter an end date to keep this page published until otherwise noted.
      </Typography>
      <div>
        <Button
          variant="text"
          sx={{ color: theme.palette.secondary.main, padding: 0, marginTop: 2 }}
          onClick={onDateRangeAdd}
        >
          ADD ANOTHER DATE/TIME RANGE
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default DateTimeRangePicker;
