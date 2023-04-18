import React from 'react';
import { Typography, Box } from '@mui/material';

import DonutChart from '../../../../libs/shared/ui-charts/donut-chart/donut-chart';
//DIFFERENT WAYS TO DEFINE PROPS

//const SamplePage:React.FC<{children:React.ReactNode}> = ({children}):JSX.Element => {
//const SamplePage = ({children}:{children:React.ReactNode}):JSX.Element => {
//const SamplePage = ():JSX.Element => {
//const SamplePage :React.FC<{}> = ():JSX.Element => {
//  const SamplePage = (props:any):JSX.Element => {

const data = [
  {
    title: 'User Segments & Location',
    subtitle: 'Who is using the app? And where do they use it?',
    info: {
      description: 'This chart shows the distribution of app users by location and user segment.',
      url: 'https://example.com/user-segments-location',
    },
    metrics: [
      {
        title: 'Users',
        description: 'Total number of app users',
        subtitle: null,
        data: [
          { title: 'USA', value: 1000 },
          { title: 'Europe', value: 500 },
          { title: 'Asia', value: 250 },
          { title: 'Australia', value: 150 },
          { title: 'Other', value: 100 },
        ],
      },
    ],
  },
];

const SamplePage = (): JSX.Element => {
  return (
    <Box title="Sample Card">
      <Typography variant="h1">Charts</Typography>

      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad minim venice, quin
        nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended in voltage veil esse colum doolie eu
        fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate descent molls anim id est labours.
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <DonutChart data={data} />
      </Box>
    </Box>
  );
};

export default SamplePage;
