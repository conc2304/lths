import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';

type DateRange = {
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
};

type Props = {
  onDateRangeSelect?: (dateRange: DateRange[]) => void;
};

const DateTimeRangePicker = ({ onDateRangeSelect }: Props) => {
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

  const handleChange = (key, value) => {
    console.log('handle change', key, value);
    const ranges = [...dateRange];
    ranges[index][key] = value;
    setDateRange(ranges);
  };

  const formatDate = (date: Date) => {
    return date ? format(date, 'MMM do, yyyy') : '';
  };

  const formatTime = (date: Date) => {
    return date ? format(date, 'hh:mm a') : '';
  };

  const ordinalifyNumber = (number: number) => {
    const ordinals = [
      'Zeroth',
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
      'Sixth',
      'Seventh',
      'Eighth',
      'Ninth',
      'Tenth',
      'Eleventh',
      'Twelfth',
      'Thirteenth',
      'Fourteenth',
      'Fifteenth',
      'Sixteenth',
      'Seventeenth',
      'Eighteenth',
      'Nineteenth',
    ];
    const prefixes = ['Twent', 'Thirt', 'Fort', 'Fift', 'Sixt', 'Sevent', 'Eight', 'Ninet'];
    if (number < 20) return ordinals[number];
    else if (number % 10 === 0) return prefixes[Math.floor(number / 10) - 2] + 'ieth';
    else return prefixes[Math.floor(number / 10) - 2] + 'y-' + ordinals[number % 10];
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
      return ranges;
    });
  };

  const addedRanges = dateRange.slice(0, -1);

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
        <TimePicker label="Select time" value={startTime} onChange={(value) => handleChange('startTime', value)} />
      </Grid>
      <Grid marginTop={2}>
        <Typography>END DATE/TIME</Typography>
        <DatePicker
          label="Select date"
          minDate={startDate || today}
          value={endDate}
          onChange={(value) => handleChange('endDate', value)}
        />
        <TimePicker label="Select time" value={endTime} onChange={(value) => handleChange('endTime', value)} />
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
