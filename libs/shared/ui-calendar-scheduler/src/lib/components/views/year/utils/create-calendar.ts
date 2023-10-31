import { endOfMonth, startOfMonth } from 'date-fns';

export const createCalendar = (currentDate: Date | undefined) => {
  if (!currentDate) {
    currentDate = new Date();
  } else {
    currentDate = new Date(currentDate);
  }

  const daysInWeek = 7;
  const first = startOfMonth(currentDate);
  const last = endOfMonth(currentDate);
  const weeksCount = Math.ceil((first.getDate() + last.getDate()) / 7);
  const calendar = {
    currentDate,
    first,
    last,
    weeks: [] as Array<Array<Date>>,
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  };

  for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
    calendar.weeks[weekNumber] = [];
    for (let day = daysInWeek * weekNumber; day < daysInWeek * (weekNumber + 1); day++) {
      const tempDate = new Date(currentDate);
      tempDate.setDate(day + 1 - first.getDay());
      calendar.weeks[weekNumber].push(tempDate);
    }
  }

  return calendar;
};
