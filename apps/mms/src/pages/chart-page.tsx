import { Typography, Box } from '@mui/material';

import AreaChartComponent from '../../../../libs/shared/ui-charts/area-chart/area-chart';
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
      value: 450,
      // Colors can be randomly generated
      color: '#0D47A1',
    },
    {
      title: 'New Attendees',
      value: 381,
      color: '#90CAF9',
    },
    {
      title: 'In arena',
      value: 600,
      color: '#1976D2',
    },
    {
      title: 'In District',
      value: 730,
      color: '#1E88E5',
    },
  ],
};

const dataForLine = [
  { date: '1 Feb', value: 50, totalDown: 10, medianDown: 5, specialEvent: 'true' },
  { date: '11 Feb', value: 1020, totalDown: 15, medianDown: 7, specialEvent: 'true' },
  { date: '1 Feb', value: 300, totalDown: 15, medianDown: 7, specialEvent: '' },
  { date: '2 Feb', value: 240, totalDown: 15, medianDown: 7, specialEvent: '' },
  { date: '9 Feb', value: 2220, totalDown: 25, medianDown: 7, specialEvent: true },
  { date: '9 Feb', value: 2220, totalDown: 25, medianDown: 7, specialEvent: true },
];

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
        <AreaChartComponent data={dataForLine} />
      </Box>
    </Box>
  );
};

export default SamplePage;
