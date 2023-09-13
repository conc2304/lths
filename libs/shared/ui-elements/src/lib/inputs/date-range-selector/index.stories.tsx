import { useState } from 'react';

import { DateRangeSelector } from './index';
import { DateRangeFilterOptions } from './mock-button-ranges';
import { DateRange } from '../../ui-filters/types';

import type { StoryFn, Meta } from '@storybook/react';

const Story: Meta<typeof DateRangeSelector> = {
  component: DateRangeSelector,
  title: 'Inputs/ Date Range Selector',
};
export default Story;

const Template: StoryFn<typeof DateRangeSelector> = (args) => {
  const [dateRangeState, setDateRangeState] = useState<DateRange>(args.value);

  return (
    <DateRangeSelector
      {...args}
      value={dateRangeState as DateRange}
      onChange={({ start_date, end_date }) => {
        setDateRangeState({ start_date, end_date });
        console.log(`On Change Fired: \n Start: \t ${start_date} \n End: \t ${end_date}`);
      }}
    />
  );
};

const initialDateFilter = DateRangeFilterOptions.find((option) => option.isDefaultValue)?.dateRange;
const { start_date, end_date } =
  typeof initialDateFilter === 'function' ? (initialDateFilter() as DateRange) : (initialDateFilter as DateRange);
const initializedDateRange = { start_date: start_date as Date, end_date: end_date as Date };

export const Primary = Template.bind({});
Primary.args = {
  dateOptions: DateRangeFilterOptions,
  value: initializedDateRange,
  onUpdateTimePeriod: ({ start_date, end_date }) =>
    console.log(`Updating Time Period  \n Start: \t ${start_date} \n End: \t ${end_date}`),
  minDate: new Date('1/1/2020'),
  maxEndDate: new Date(),
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  dateOptions: [],
  onUpdateTimePeriod: ({ start_date, end_date }) =>
    console.log(`Updating Time Period  \n Start: \t ${start_date} \n End: \t ${end_date}`),
  minDate: new Date('1/1/2020'),
  maxEndDate: new Date(),
};
