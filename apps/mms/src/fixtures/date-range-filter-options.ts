import { DateFilterOptions } from '@lths/shared/ui-elements';
import {
  getPrevFullDayRange,
  getPrevFullHalfYearRange,
  getPrevFullHourRange,
  getPrevFullMonthRange,
  getPrevFullQuarterRange,
  getPrevFullWeekRange,
  getPrevFullYearRange,
} from '@lths/shared/utils';

export const DateRangeFilterOptions: DateFilterOptions = [
  {
    label: '1 Hour',
    dateRange: getPrevFullHourRange,
  },
  {
    label: '1 Day',
    dateRange: getPrevFullDayRange,
  },
  {
    label: '7 Days',
    dateRange: getPrevFullWeekRange,
    isDefaultValue: true,
  },
  {
    // Previous full Month
    label: '30 Days',
    dateRange: getPrevFullMonthRange,
  },
  {
    // Previous Quarter
    label: '3 Months',
    dateRange: getPrevFullQuarterRange,
  },
  {
    // Previous full half year
    label: '6 Months',
    dateRange: getPrevFullHalfYearRange,
  },
  {
    // Previous full year
    label: '12 Months',
    dateRange: getPrevFullYearRange,
  },
];
