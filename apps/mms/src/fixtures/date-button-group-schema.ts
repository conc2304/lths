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
    dateRangeFn: getPrevFullHourRange,
  },
  {
    label: '1 Day',
    dateRangeFn: getPrevFullDayRange,
  },
  {
    label: '7 Days',
    dateRangeFn: getPrevFullWeekRange,
  },
  {
    // Previous full Month
    label: '30 Days',
    dateRangeFn: getPrevFullMonthRange,
  },
  {
    // Previous Quarter
    label: '3 Months',
    dateRangeFn: getPrevFullQuarterRange,
  },
  {
    // Previous full half year
    label: '6 Months',
    dateRangeFn: getPrevFullHalfYearRange,
  },
  {
    // Previous full year
    label: '12 Months',
    dateRangeFn: getPrevFullYearRange,
  },
];
