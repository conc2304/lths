import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

import colors from '../../../../../common/colors';
type Props = {
  home_team: string;
  away_team: string;
};

const TeamAbbrv = (props: Props) => {
  const { home_team, away_team } = props;
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ marginX: 2, fontSize: 1.5, marginY: 1 }}>
      <Typography
        fontSize="1.5rem"
        letterSpacing="0.28px"
        textTransform="uppercase"
        color={colors.editor.text}
        lineHeight="2rem"
      >
        {home_team}
      </Typography>
      <Typography
        fontSize="1.5rem"
        letterSpacing="0.28px"
        textTransform="uppercase"
        color={colors.editor.text}
        lineHeight="2rem"
      >
        {away_team}
      </Typography>
    </Stack>
  );
};
export default TeamAbbrv;
