
import { Typography,Box } from '@mui/material';
import { Profile } from '../components/layouts';
import PositionedPopper from '../components/layouts/popper-test';


import { useAppSelector } from '../store';


const SamplePage = ():JSX.Element => {
    

 
    //const user = useAppSelector(state=>state.user);


    return (
    <Box title="Sample Card">
        <Typography>Hello user?.name</Typography>
        <Profile/>
        <PositionedPopper/>
        <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography>
    </Box>
);
}

export default SamplePage;
