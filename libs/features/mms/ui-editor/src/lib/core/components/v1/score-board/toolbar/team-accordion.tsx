import { Typography } from '@mui/material';

import ScoreBoardTeam from './team';
import { Accordion, AccordionSummary, AccordionDetails } from '../../../../../elements';
import { ScoreBoardTeamProps } from '../../../types';

type Props = ScoreBoardTeamProps & {
  objectId: string;
  label: string;
  onChange: (objectId: string, propId: string, value: string) => void;
};
const TeamAccordion = ({ onChange, label, objectId, ...rest }: Props) => {
  const handleChange = (propId: string, value: string) => {
    onChange(objectId, propId, value);
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ScoreBoardTeam {...rest} onChange={handleChange} />
      </AccordionDetails>
    </Accordion>
  );
};
export default TeamAccordion;
