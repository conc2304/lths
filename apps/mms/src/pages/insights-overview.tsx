import { Typography, Box } from '@mui/material'; //
import { LTHS_ButtonGroup } from '@lths/shared/ui-elements';
import React from 'react';

type InsightOverviewProps = {
  //
};

const ButtonGroupConf: Array<{ label: string; onClick: () => void }> = [
  {
    label: '1 Hour',
    onClick: () => {
      console.log('1 hour');
    },
  },
  {
    label: '1 Day',
    onClick: () => {
      console.log('1 Day');
    },
  },
  {
    label: '7 Days',
    onClick: () => {
      console.log('7 Days');
    },
  },
  {
    label: '30 Days',
    onClick: () => {
      console.log('30 Days');
    },
  },
  {
    label: '3 Months',
    onClick: () => {
      console.log('3 Months');
    },
  },
  {
    label: '6 Months',
    onClick: () => {
      console.log('6 Months');
    },
  },
  {
    label: '12 Months',
    onClick: () => {
      console.log('12 Months');
    },
  },
];

const InsightsOverviewPage = (props: InsightOverviewProps): JSX.Element => {
  console.log('InsightsOverviewPage');
  console.log(props);
  return <LTHS_ButtonGroup buttons={ButtonGroupConf}></LTHS_ButtonGroup>;
};

export default InsightsOverviewPage;
