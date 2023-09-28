import { useMemo } from 'react';
import { Button, Typography } from '@mui/material';

import DucksLogo from '../../../../../assets/Ducks-logo.svg';
import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import MatchupComponent from '../../common/matchup';
import { HalfHeightMatchUpComponentProps } from '../../types';
const HalfHeightMatchupComponent = (props: HalfHeightMatchUpComponentProps) => {
  const {
    __ui_id__: id,
    data: { max_size, btn_text, title },
  } = props;

  const matchups = useMemo(() => {
    const components = [];
    for (let i = 0; i < max_size; i++) {
      components.push(
        <MatchupComponent
          key={`matchup_${i}`}
          home_team_name="Team name"
          away_team_name="Team name"
          home_team_logo={DucksLogo}
          away_team_logo={DucksLogo}
          date="Apr 5"
          time="7:00 PM"
        />
      );
    }
    return components;
  }, [max_size]);

  return (
    <BasicContainer id={id}>
      <Typography sx={{ fontSize: '1.5rem', color: colors.editor.text, marginBottom: 3 }} variant="h3">
        {title}
      </Typography>
      {matchups}
      <Button
        sx={{
          fontSize: '1rem',
          fontWeight: 500,
          color: colors.editor.text,
          border: `1px solid ${colors.button.border}`,
          borderRadius: '2rem',
          paddingY: 1.5,
          marginTop: 1.5,
          '&:hover': {
            color: colors.editor.text,
          },
        }}
        fullWidth
        variant="outlined"
      >
        {btn_text}
      </Button>
    </BasicContainer>
  );
};

export default HalfHeightMatchupComponent;
