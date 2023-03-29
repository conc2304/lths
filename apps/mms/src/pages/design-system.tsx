import { Typography, Box } from '@mui/material'; //
import { DateRangeSelector } from '@lths/shared/ui-elements';
import { subDays, subHours, subMonths } from 'date-fns';

type DesignSystemProps = {
  //
};
export type DateFilterOption = Array<{
  label: string;
  value:  Date;
  onClick: (value:  Date) => void;
}>;

const now = new Date();
const ButtonGroupConf: DateFilterOption = [
  {
    label: '1 Hour',
    value: subHours(now, 1),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '1 Day',
    value: subDays(now, 1),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '7 Days',
    value: subDays(now, 7),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '30 Days',
    value: subDays(now, 30),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '3 Months',
    value: subMonths(now, 3),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '6 Months',
    value: subMonths(now, 6),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
  {
    label: '12 Months',
    value: subMonths(now, 12),
    onClick: (value:  Date) => {
      console.log(value);
    },
  },
];

const DesignSystem = (props: DesignSystemProps): JSX.Element => {
  return (
    <Box title="MMS Design System" width={'100%'}>
      <Typography variant="h1" textAlign={'center'}>
        MMS Design System!
      </Typography>

      <Typography variant="h3">Inputs</Typography>
      <Typography>Button Group</Typography>
      {/* <LthsButtonGroup buttons={ButtonGroupConf} /> */}

      <DateRangeSelector
        dateOptions={ButtonGroupConf}
        onChange={({ startDate, endDate }) => {
          console.log('date changed', startDate, endDate);
        }}
      />
    </Box>
  );
};

export default DesignSystem;
