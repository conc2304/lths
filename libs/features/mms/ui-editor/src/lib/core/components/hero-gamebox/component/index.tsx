import { Box } from '@mui/material';

import { getGreetingBasedOnTimeOfToday } from '@lths/shared/ui-elements';

import PlayArrowIcon from './../../../../../assets/play-arrow-icon.svg';
import PucksDucksIcon from './../../../../../assets/pucks-ducks-icon.svg';
import PucksPanthersIcon from './../../../../../assets/pucks-panthers-icon.svg';
import Details from './details';
import GameboxButton from './gamebox-button';
import Header from './header';
import Matchup from './matchup';
import TeamAbbrv from './team-abbrv';
import TeamScore from './team-score';
import { HERO_GAMEBOX_HEIGHT } from '../../../../common';
import { BasicContainer } from '../../../../elements';
import { GameEventState, HeroGameboxComponentProps } from '../../types';
const HeroGameboxComponent = (props: HeroGameboxComponentProps) => {
  const {
    __ui_id__: id,
    data: {
      pregame: { show_at_text, show_date_text, show_time_text } = {},
      ingame: { show_period_text, show_time_remain_text, show_stats_btn, btn_text: ingame_btn_text } = {},
      postgame: { show_final_text, show_highlights_btn, btn_text_play_icon, btn_text: postgame_btn_text } = {},
      image,
      editor_meta_data,
      show_greetings,
      title,
    },
  } = props;

  const { PRE_GAME, IN_GAME, POST_GAME } = GameEventState;

  const eventState = editor_meta_data ? editor_meta_data.game_event_state : PRE_GAME;

  const getBtnText = () => {
    if (eventState === IN_GAME) return ingame_btn_text;
    else if (eventState === POST_GAME) return postgame_btn_text;
    else return 'Label';
  };

  const btnIconSrc = eventState === POST_GAME && btn_text_play_icon ? PlayArrowIcon : null;

  const greetingText = getGreetingBasedOnTimeOfToday();

  const headerText = show_greetings ? greetingText : title;

  const showTeamScore = eventState === IN_GAME || eventState === POST_GAME;

  const showGameBoxButton =
    (eventState === IN_GAME && show_stats_btn) || (eventState === POST_GAME && show_highlights_btn);

  return (
    <BasicContainer id={id} sx={{ margin: 0 }}>
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: HERO_GAMEBOX_HEIGHT,
          width: '100%',
          padding: 2.5,
          textAlign: 'center',
        }}
      >
        <Header headerText={headerText} />
        <Matchup
          away_team_logo={PucksPanthersIcon}
          home_team_logo={PucksDucksIcon}
          show_at_text={show_at_text}
          game_event_state={eventState}
          sx={{ marginX: 5.5, marginTop: 5 }}
        />
        {eventState === PRE_GAME && (
          <>
            <TeamAbbrv away_team_name="FLA" home_team_name="ANA" sx={{ marginX: 2, marginTop: 2 }} />
            <Details
              dayDate="Thu, Apr 3"
              time="7:00pm"
              showDateText={show_date_text}
              showTimeText={show_time_text}
              sx={{ marginTop: 2.5, paddingY: 2.5 }}
            />
          </>
        )}
        {showTeamScore && (
          <TeamScore
            awayTeamScore="1"
            homeTeamScore="2"
            gameEventState={eventState}
            showPeriodText={show_period_text}
            showTimeRemainText={show_time_remain_text}
            showFinalText={show_final_text}
            sx={{ marginX: 9.25, marginTop: 2 }}
          />
        )}
        {showGameBoxButton && <GameboxButton btnText={getBtnText()} iconSrc={btnIconSrc} sx={{ marginTop: 5 }} />}
      </Box>
    </BasicContainer>
  );
};

export default HeroGameboxComponent;
