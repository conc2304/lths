import React from 'react';
import { Typography, Box } from '@mui/material'; //

import AreaChartComponent from '../../../../libs/shared/ui-charts/area-chart/area-chart';
import { HistogramComponentProps } from '../../../../libs/shared/ui-charts/area-chart/types';
import DonutChart from '../../../../libs/shared/ui-charts/donut-chart/donut-chart';
//DIFFERENT WAYS TO DEFINE PROPS

//const SamplePage:React.FC<{children:React.ReactNode}> = ({children}):JSX.Element => {
//const SamplePage = ({children}:{children:React.ReactNode}):JSX.Element => {
//const SamplePage = ():JSX.Element => {
//const SamplePage :React.FC<{}> = ():JSX.Element => {
//  const SamplePage = (props:any):JSX.Element => {

const data = {
  // ...rest of the data
  summaries: [
    {
      title: 'Club Members',
      value: 400,
      // Colors can be randomly generated
      color: '#0D47A1',
    },
    {
      title: 'New Attendees',
      value: 781,
      color: '#90CAF9',
    },
    {
      title: 'In arena',
      value: 600,
      color: '#1976D2',
    },
    {
      title: 'In District',
      value: 1000,
      color: '#1E88E5',
    },
  ],
};

const histogramData: HistogramComponentProps = {
  title: 'Active Users',
  subtitle: 'How many people are using the app?',
  info: {
    description: 'Metric for tracking the number of active users',
    url: 'https://example.com/metrics/active-users',
  },
  value: null,
  trends: undefined,
  unit: '%',
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

const transformDataForDonutChart = (summaries) => {
  return summaries.map((summary) => ({
    name: summary.title,
    value: summary.value,
    color: summary.color,
  }));
};

const SamplePage = (): JSX.Element => {
  const donutChartData = transformDataForDonutChart(data.summaries);
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
        <DonutChart
          data={donutChartData}
          width="100%"
          height={400}
          innerRadius="43%"
          outerRadius="80%"
          startAngle={90}
          endAngle={-270}
          title="USERS"
          labelColor="#fff"
        />
      </Box>
      <Box>
        <AreaChartComponent data={histogramData.data} />
      </Box>
    </Box>
  );
};

export default SamplePage;
