import { Typography, Box } from '@mui/material';

import { useAppSelector } from '@lths/features/mms/data-access';

import { Profile } from '../../components/layouts';
import PositionedPopper from '../../components/layouts/popper-test';

const SamplePage = (): JSX.Element => {
  const user = useAppSelector((state) => state.users.user);

  console.log('user', user);
  return (
    <Box title="Sample Card">
      <Typography>
        Hello {user?.first_name} {user.last_name}
      </Typography>
      <Profile />
      <PositionedPopper />
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna
        alissa. Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons
        construal. Duos aube grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian.
        Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate descent molls anim id est labours. More
        text here.
      </Typography>
    </Box>
  );
};

export default SamplePage;
