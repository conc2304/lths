import {
  getPrevFullDayRange,
  getPrevFullHalfYearRange,
  getPrevFullHourRange,
  getPrevFullMonthRange,
  getPrevFullQuarterRange,
  getPrevFullWeekRange,
  getPrevFullYearRange,
} from '@lths/shared/utils';
import { DateFilterOption } from 'libs/shared/ui-elements/src/lib/inputs/date-range-selector/types';

export const ButtonGroupConf: DateFilterOption = [
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
