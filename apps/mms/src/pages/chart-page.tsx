import React from 'react';
import { Typography, Box } from '@mui/material';

import LineChart from '../../../../libs/shared/ui-charts/line-chart/line-chart';
//DIFFERENT WAYS TO DEFINE PROPS

//const SamplePage:React.FC<{children:React.ReactNode}> = ({children}):JSX.Element => {
//const SamplePage = ({children}:{children:React.ReactNode}):JSX.Element => {
//const SamplePage = ():JSX.Element => {
//const SamplePage :React.FC<{}> = ():JSX.Element => {
//  const SamplePage = (props:any):JSX.Element => {

const histogramData = {
  // other props can be passed here
  data: [
    {
      datetime: '2022-03-10T10:11:22Z',
      value: 1234,
      trends: {
        duration: 7,
        span: {
          title: 'Prev 7 days',
          unit: '%',
          value: 25,
          direction: 'down',
        },
        median: {
          title: 'Prev 7 days',
          unit: '%',
          value: 30,
          direction: 'up',
        },
      },
    },
    {
      datetime: '2022-03-11T10:11:22Z',
      value: 1456,
      trends: {
        duration: 7,
        span: {
          title: 'Prev 7 days',
          unit: '%',
          value: 30,
          direction: 'up',
        },
        median: {
          title: 'Prev 7 days',
          unit: '%',
          value: 33,
          direction: 'up',
        },
      },
    },
    {
      datetime: '2022-03-31T10:11:22Z',
      value: 126,
      trends: {
        duration: 7,
        span: {
          title: 'Prev 7 days',
          unit: '%',
          value: 30,
          direction: 'up',
        },
        median: {
          title: 'Prev 7 days',
          unit: '%',
          value: 33,
          direction: 'up',
        },
      },
    },
    // add more data points here
  ],
  options: {
    events: [
      {
        datetime: '2022-03-10T10:11:22Z',
        title: 'Beyonce',
        id: 'a-v90as0b9',
        description: 'Some description',
        details: 'Some details',
      },
      {
        datetime: '2022-03-11T10:11:22Z',
        title: 'Jay-Z',
        id: 'b-fs20s0j2',
        description: 'Some description',
        details: 'Some details',
      },
      // add more events here
    ],
  },
};

const SamplePage = (): JSX.Element => {
  return (
    <Box title="Sample Card">
      <Typography variant="h1">Charts</Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad minim venice, quin
        nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended in voltage veil esse colum doolie eu
        fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate descent molls anim id est labours.
      </Typography>
      <Box>
        <LineChart data={histogramData.data} />
      </Box>
    </Box>
  );
};

export default SamplePage;
