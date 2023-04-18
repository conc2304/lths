export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type DateFilterOption = Array<{
  label: string;
  value: Date;
  onClick: () => DateRange;
}>;
