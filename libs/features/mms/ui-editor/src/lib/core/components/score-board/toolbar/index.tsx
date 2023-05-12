import { ChangeEvent } from 'react';
import { Box, Typography } from '@mui/material';

import { useEditorActions } from '../../../../context';
import {
  CardContainer,
  SegmentedButton,
  BasicTextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../../../../elements';
import { ScoreBoardComponentProps, ScoreBoardTeamProps } from '../../types';

type Props = ScoreBoardTeamProps & {
  onChange: (key: string, vaue: string) => void;
};
const ScoreBoardTeam = ({ logo, name, info, point, btn_title, action, onChange }: Props) => {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('name', event.target.value);
  };
  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('logo', event.target.value);
  };
  const handleInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('info', event.target.value);
  };
  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('point', event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <BasicTextField label={'Team Name'} value={name} onChange={handleNameChange} />
      <BasicTextField label={'Logo URL'} value={logo} onChange={handleLogoChange} />

      <BasicTextField label={'Points'} value={point} onChange={handleScoreChange} />
      <BasicTextField label={'Info'} value={info} onChange={handleInfoChange} />
    </Box>
  );
};
const ScoreBoardToolbar = (props: ScoreBoardComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { date_info, match_name, hint, left, right },
  } = props;
  const { selectComponent } = useEditorActions();

  const updateComponenetProp = (key: string, value: string | number | null) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
  };

  const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('date_info', event.target.value);
  };
  const handleGameStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('match_name', event.target.value);
  };
  const handleGameInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('hint', event.target.value);
  };
  const handleLeftChange = (key: string, value: string) => {
    const data = {
      ...props,
      default_data: { ...props.default_data, left: { ...props.default_data.left, [key]: value } },
    };
    selectComponent(data);
  };
  const handleRightChange = (key: string, value: string) => {
    const data = {
      ...props,
      default_data: { ...props.default_data, right: { ...props.default_data.right, [key]: value } },
    };
    selectComponent(data);
  };
  const handleLeftButtonTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleLeftChange('btn_title', event.target.value);
  };
  const handleRightButtonTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleRightChange('btn_title', event.target.value);
  };
  return (
    <CardContainer id={`${id}_toolbar`} aria-label="Button Toolbar">
      <BasicTextField label={'Header'} value={date_info} onChange={handleHeaderChange} />
      <BasicTextField label={'Game State'} value={match_name} onChange={handleGameStateChange} />
      <BasicTextField label={'Game Info'} value={hint} onChange={handleGameInfoChange} />
      <Box sx={{ gap: 0 }}>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Team Left</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ScoreBoardTeam {...left} onChange={handleLeftChange} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Team Right</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ScoreBoardTeam {...right} onChange={handleRightChange} />
          </AccordionDetails>
        </Accordion>
      </Box>
      <Accordion>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Footer Buttons</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BasicTextField label={'Left Title'} value={left.btn_title} onChange={handleLeftButtonTitleChange} />
          <BasicTextField label={'Right Title'} value={right.btn_title} onChange={handleRightButtonTitleChange} />
        </AccordionDetails>
      </Accordion>
    </CardContainer>
  );
};
export default ScoreBoardToolbar;
