export type DateRange = {
  start: Date;
  end: Date;
};

export type DateRangeFn = () => DateRange;

export type DateFilterOption = Array<{
  label: string;
  dateRange: DateRangeFn | DateRange;
}>;
