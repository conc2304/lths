export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type DateRangeFn = () => DateRange;

export type DateFilterOption = Array<{
  label: string;
  dateRange: DateRangeFn | DateRange;
}>;
