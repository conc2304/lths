import { Stack, SxProps, Typography } from '@mui/material';

import { Colors } from '../../../../../common';
import { GameEventState } from '../../../types';

type Props = {
  away_team_logo: string;
  home_team_logo: string;
  show_at_text?: boolean;
  game_event_state?: GameEventState;
  sx?: SxProps;
};

const TeamLogo = (props: { logo: string }) => {
  const { logo } = props;
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width={84}
      height={84}
      borderRadius="50%"
      sx={{ background: Colors.card.background }}
    >
      <img src={logo} alt="team logo" />
    </Stack>
  );
};

const Matchup = (props: Props) => {
  const { PRE_GAME } = GameEventState;

  const { away_team_logo, home_team_logo, show_at_text = true, game_event_state = PRE_GAME, sx = {} } = props;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={sx}>
      <TeamLogo logo={away_team_logo} />
      {game_event_state === PRE_GAME && show_at_text && (
        <Typography color={Colors.editor.text} fontWeight={500}>
          AT
        </Typography>
      )}
      <TeamLogo logo={home_team_logo} />
    </Stack>
  );
};

export default Matchup;
