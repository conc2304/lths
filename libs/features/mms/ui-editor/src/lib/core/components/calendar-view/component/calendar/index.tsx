import { Grid, Paper, Typography } from '@mui/material';
import { startOfWeek, endOfWeek, endOfMonth, eachDayOfInterval, addDays, isSameMonth, format } from 'date-fns';

import { CAlENDAR_HEIGHT } from '../../../../../common';
import colors from '../../../../../common/colors';

interface CalendarProps {
  month: number;
  year: number;
  isRowNumStatic?: boolean;
  height?: number;
}

const Calendar = (props: CalendarProps) => {
  const {
    month, 
    year,
    isRowNumStatic = true,
    height = CAlENDAR_HEIGHT,
  } = props;
  const { background, day: { isCurrentMonth, notCurrentMonth } } = colors.calendar;

  const getDaysForCalendarDisplay = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDay = isRowNumStatic ? addDays(startOfWeek(firstDayOfMonth), 41) : endOfWeek(endOfMonth(firstDayOfMonth));

    return eachDayOfInterval({
      start: startOfWeek(firstDayOfMonth),
      end: lastDay,
    });
  }

  const isDayInSelectedMonth = (day: Date) => {
    const dayInSelectedMonth = new Date(year, month);
    return isSameMonth(day, dayInSelectedMonth)
  }

  const renderDay = (day: Date) => {
    return (
      <Typography
        color={isDayInSelectedMonth(day) ? isCurrentMonth.text : notCurrentMonth.text}
        sx={{ fontWeight: 500, fontSize: 12, }}
      >
        {format(day, "d")}
      </Typography>
    );
  }

  const daysToDisplay = getDaysForCalendarDisplay();

  return (
    <Grid container columns={7}
      sx={{
        height: height,
        backgroundColor: background,
        padding: '10px'
      }}
    >
      {daysToDisplay.map((day) => (
        <Grid item xs={1} key={day.toString()}
          sx={{ padding: '1px' }}
        >
          <Paper
            sx={{
              width: "100%", height: '100%',
              borderRadius: '5px',
              padding: '3px 5px',
              boxShadow: 'none',
              backgroundColor: isDayInSelectedMonth(day) ? isCurrentMonth.background : notCurrentMonth.background,
            }}
          >
            {renderDay(day)}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Calendar;
