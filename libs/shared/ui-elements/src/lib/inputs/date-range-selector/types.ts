export type DateFilterOption = Array<{
  label: string;
  value: string | number | Date;
  onClick: (value: string | number | Date) => void;
}>;
