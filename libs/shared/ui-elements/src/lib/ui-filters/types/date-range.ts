export type DateRange = {
  start_date: Date | null;
  end_date: Date | null;
};

export type DateFilter = {
  start_date: string;
  end_date: string;
};

export type DateRangeFn = () => DateRange;

export type DateFilterOptions = Array<DateFilterOption>;

export type DateFilterOption = { label: string; dateRange: DateRangeFn | DateRange; isDefaultValue?: boolean };
