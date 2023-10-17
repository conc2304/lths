import { Stack, SxProps, Typography } from '@mui/material';

import { Colors } from '../../../../../common';
import { GameEventState } from '../../../types';
import BoldText from '../bold-text';

type Props = {
  awayTeamScore: string;
  homeTeamScore: string;
  showPeriodText?: boolean;
  showTimeRemainText?: boolean;
  showFinalText?: boolean;
  gameEventState?: GameEventState;
  winningTeam?: string;
  sx?: SxProps;
};

const TeamScore = (props: Props) => {
  const { IN_GAME, POST_GAME } = GameEventState;

  const {
    awayTeamScore,
    homeTeamScore,
    showPeriodText,
    showTimeRemainText,
    showFinalText,
    gameEventState,
    winningTeam = 'home',
    sx = {},
  } = props;

  const isLost = (team: string) => gameEventState === POST_GAME && team !== winningTeam;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={sx}>
      <BoldText text={awayTeamScore} greyOut={isLost('away')} />
      {gameEventState === IN_GAME && (
        <Stack direction="column" alignItems="center" textAlign="center">
          {showPeriodText && (
            <Typography color={Colors.editor.subText} fontSize="0.875rem" fontWeight={450}>
              1st
            </Typography>
          )}
          {showTimeRemainText && (
            <Typography color={Colors.editor.text} fontSize="0.875rem" fontWeight={450}>
              5:58
            </Typography>
          )}
        </Stack>
      )}
      {gameEventState === POST_GAME && showFinalText && (
        <Typography color={Colors.editor.subText} fontSize="0.875rem" fontWeight={450}>
          Final
        </Typography>
      )}
      <BoldText text={homeTeamScore} greyOut={isLost('home')} />
    </Stack>
  );
};

export default TeamScore;
