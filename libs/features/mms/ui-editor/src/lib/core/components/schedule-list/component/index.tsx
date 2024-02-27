import { Box, Stack } from '@mui/material';

import PlayArrowIcon from './../../../../../assets/play-arrow-icon.svg';
import PucksDucksIcon from './../../../../../assets/pucks-ducks-icon.svg';
import PucksPanthersIcon from './../../../../../assets/pucks-panthers-icon.svg';
import GameDetails from './game-details';
import TeamAbbrv from './team-abbrv';
import TeamLogo from './team-logo';
import TeamScore from './team-score';
import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import GameboxButton from '../../hero-gamebox/component/gamebox-button';
import { ScheduleListComponentProps } from '../../types';

const ScheduleListComponent = (props: ScheduleListComponentProps) => {
  const {
    __ui_id__: id,
    data: { btn_ingame_txt, btn_post_game_txt, btn_buy_tickets_txt, btn_more_info_txt, is_show_ingame_btn_icon },
  } = props;
  const boxSx = {
    padding: 1.5,
    background: colors.card.background,
    boxShadow: colors.card.boxShadow,
    marginBottom: 2.5,
    borderRadius: 2.5,
    marginTop: 1.5,
  };
  const playIcon = is_show_ingame_btn_icon ? PlayArrowIcon : '';
  return (
    <BasicContainer id={id}>
      <Box sx={boxSx}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TeamLogo imageSrc={PucksPanthersIcon} />
          <TeamScore sx={{ fontSize: '2rem', fontWeight: 600 }} color={colors.editor.subText} score={2} />
          <GameDetails text="Final" time_date=" Dec, 1" />
          <TeamScore sx={{ fontSize: '2rem', fontWeight: 600 }} color={colors.editor.text} score={4} />
          <TeamLogo imageSrc={PucksDucksIcon} />
        </Stack>
        <TeamAbbrv home_team={'FLA@'} away_team={'ANA'} />
        <GameboxButton btnText={btn_post_game_txt} sx={{ width: '100%', borderRadius: '2rem !important' }} />
      </Box>
      <Box sx={boxSx}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TeamLogo imageSrc={PucksPanthersIcon} />
          <TeamScore sx={{ fontSize: '2rem', fontWeight: 600 }} color={colors.editor.text} score={1} />
          <GameDetails text="1st" time_date="5:31" />
          <TeamScore sx={{ fontSize: '2rem', fontWeight: 600 }} color={colors.editor.text} score={0} />
          <TeamLogo imageSrc={PucksDucksIcon} />
        </Stack>
        <TeamAbbrv home_team={'FLA@'} away_team={'ANA'} />
        <GameboxButton
          btnText={btn_ingame_txt}
          iconSrc={playIcon}
          sx={{ width: '100%', borderRadius: '2rem !important' }}
        />
      </Box>
      <Box sx={boxSx}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TeamLogo imageSrc={PucksPanthersIcon} />
          <GameDetails text="December, 15" time_date="7:00pm" />
          <TeamLogo imageSrc={PucksDucksIcon} />
        </Stack>
        <TeamAbbrv home_team={'FLA@'} away_team={'ANA'} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <GameboxButton
            btnText={btn_buy_tickets_txt}
            sx={{ borderRadius: '2rem !important', textTransform: 'none' }}
          />
          <GameboxButton btnText={btn_more_info_txt} sx={{ borderRadius: '2rem !important' }} />
        </Stack>
      </Box>
    </BasicContainer>
  );
};

export default ScheduleListComponent;
