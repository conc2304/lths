import { Typography, Box } from '@mui/material'; //
import { ChartCard } from '@lths/shared/ui-elements';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



//DIFFERENT WAYS TO DEFINE PROPS

//const SamplePage:React.FC<{children:React.ReactNode}> = ({children}):JSX.Element => {
//const SamplePage = ({children}:{children:React.ReactNode}):JSX.Element => {
//const SamplePage = ():JSX.Element => {
//const SamplePage :React.FC<{}> = ():JSX.Element => {
//  const SamplePage = (props:any):JSX.Element => {


const SamplePage = (): JSX.Element => {
  return (
    <Box title="Sample Card">
      <Typography variant="h1">Charts</Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad minim venice, quin
        nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended in voltage veil esse colum doolie eu
        fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate descent molls anim id est labours.
      </Typography>
      <ChartCard title="Happy Morning!! 🥳🥳" subheader="Cheers 🙌" action={<InfoOutlinedIcon/>}>
        Cheers to New Weekdays!!
      </ChartCard>
    </Box>
  );
};

export default SamplePage;
