import { Typography, Box } from '@mui/material'; //
import { DateRangeSelector } from '@lths/shared/ui-elements';

type DesignSystemProps = {
  //
};

const ButtonGroupConf: Array<{
  label: string;
  value: string | number;
  onClick: (value: string | number) => void;
}> = [
  {
    label: '1 Hour',
    value: '1 Hour',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '1 Day',
    value: '1 Day',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '7 Days',
    value: '7 Days',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '30 Days',
    value: '30 Days',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '3 Months',
    value: '3 Months',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '6 Months',
    value: '6 Months',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
  {
    label: '12 Months',
    value: '12 Months',
    onClick: (value: string | number) => {
      console.log(value);
    },
  },
];

const DesignSystem = (props: DesignSystemProps): JSX.Element => {
  return (
    <Box title="MMS Design System" width={'100%'}>
      <Typography variant="h1" textAlign={'center'}>
        MMS Design System
      </Typography>

      <Typography variant="h3">Inputs</Typography>
      <Typography>Button Group</Typography>
      {/* <LthsButtonGroup buttons={ButtonGroupConf} /> */}

      <DateRangeSelector
        dateOptions={ButtonGroupConf}
        onChange={() => {
          console.log('date changed');
        }}
      />
    </Box>
  );
};

export default DesignSystem;
