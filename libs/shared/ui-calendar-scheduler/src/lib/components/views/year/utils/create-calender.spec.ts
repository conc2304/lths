import { createCalendar } from './create-calendar';

describe('createCalendar', () => {
  it('defaults to current date when no date is provided', () => {
    const today = new Date();
    const result = createCalendar(undefined);
    expect(result.currentDate.toDateString()).toEqual(today.toDateString());
  });

  it('creates a calendar structure for the given month', () => {
    const date = new Date('2023-02-15'); // February has 28 days in 2023
    const result = createCalendar(date);
    expect(result.first.getDate()).toBe(1);
    expect(result.last.getDate()).toBe(28);
    expect(result.year).toBe(2023);
    expect(result.month).toBe(1); // January is 0
  });

  it('starts the first week on the first day of the month or nearest preceding day from previous month', () => {
    // Feb 1, 2023 is a Wednesday
    const date = new Date('2023-02-15');
    const result = createCalendar(date);

    const firstDayOfFirstWeek = result.weeks[0][0];
    // First day of week is Jan 29th
    expect(firstDayOfFirstWeek.getDate()).toBe(29);
  });

  it('ends the last week on the last day of the month or nearest following day from next month', () => {
    // Feb 28, 2023 is a Tuesday
    const date = new Date('2023-02-15');
    const result = createCalendar(date);

    // Last day of the week for the last week of the month is March 4th
    const totalWeeks = result.weeks.length;
    const lastWeek = result.weeks[totalWeeks - 1];
    const lastDateOfWeek = lastWeek[lastWeek.length - 1];
    expect(lastDateOfWeek.getDate()).toBe(4);
  });
});
