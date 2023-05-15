import { ChangeEvent } from 'react';
import { Box } from '@mui/material';

import FooterAccordion from './footer';
import TeamAccordion from './team-accordion';
import { CardContainer, BasicTextField } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ScoreBoardComponentProps } from '../../types';

const ScoreBoardToolbar = (props: ScoreBoardComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { date_info, match_name, hint, left, right },
  } = props;
  const { updateComponentProp } = useToolbarChange();

  const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('date_info', event.target.value);
  };
  const handleGameStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('match_name', event.target.value);
  };
  const handleGameInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('hint', event.target.value);
  };

  const handleTeamChange = (group: string, key: string, value: string) => {
    updateComponentProp(group, { ...props.default_data.left, [key]: value });
  };
  return (
    <CardContainer id={`${id}_toolbar`} aria-label="Button Toolbar">
      <BasicTextField label={'Header'} value={date_info} onChange={handleHeaderChange} />
      <BasicTextField label={'Game State'} value={match_name} onChange={handleGameStateChange} />
      <BasicTextField label={'Game Info'} value={hint} onChange={handleGameInfoChange} />
      <Box sx={{ gap: 0 }}>
        <TeamAccordion objectId="left" label="Team Left" onChange={handleTeamChange} {...left} />
        <TeamAccordion objectId="right" label="Team Right" onChange={handleTeamChange} {...right} />
      </Box>
      <FooterAccordion left={left.btn_title} right={right.btn_title} onChange={handleTeamChange} />
    </CardContainer>
  );
};
export default ScoreBoardToolbar;
