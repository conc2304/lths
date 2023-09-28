import { Box, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import TeamBlock from './team-block';
import colors from '../../../../common/colors';

type MatchupComponentProps = {
  away_team_name: string;
  away_team_logo: string;
  home_team_name: string;
  home_team_logo: string;
  date: string;
  time: string;
};

const MatchupComponent = (props: MatchupComponentProps) => {
  const { away_team_name, away_team_logo, home_team_name, home_team_logo, date, time } = props;

  return (
    <Box
      sx={{
        padding: 2.5,
        background: colors.card.background,
        boxShadow: colors.card.boxShadow,
        marginBottom: 1.5,
        borderRadius: 2.5,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column" spacing={1.5}>
          <TeamBlock logo={home_team_logo} name={home_team_name} />
          <TeamBlock logo={away_team_logo} name={away_team_name} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ borderLeft: `1px solid ${colors.card.border}` }}
          paddingLeft={2}
        >
          <Box>
            <Typography color={colors.editor.text}>{date}</Typography>
            <Typography sx={{ color: colors.editor.subText, fontSize: '0.875rem' }}>{time}</Typography>
          </Box>
          <ChevronRightIcon htmlColor={colors.card.border} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default MatchupComponent;
