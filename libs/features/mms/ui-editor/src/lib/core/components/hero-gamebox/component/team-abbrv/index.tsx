import { Stack, SxProps } from '@mui/material';

import BoldText from '../bold-text';

type Props = {
  away_team_name: string;
  home_team_name: string;
  sx?: SxProps;
};

const TeamAbbrv = (props: Props) => {
  const { away_team_name, home_team_name, sx = {} } = props;

  return (
    <Stack direction="row" justifyContent="space-between" sx={sx}>
      <BoldText text={away_team_name} />
      <BoldText text={home_team_name} />
    </Stack>
  );
};

export default TeamAbbrv;
