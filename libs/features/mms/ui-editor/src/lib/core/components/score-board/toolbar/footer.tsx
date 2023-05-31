import { ChangeEvent } from 'react';
import { Typography } from '@mui/material';

import { BasicTextField, Accordion, AccordionSummary, AccordionDetails } from '../../../../elements';

type Props = {
  left: string;
  right: string;
  onChange: (groupId: string, propId: string, value: string) => void;
};

const ScoreBoardFooter = ({ left, right, onChange }: Props) => {
  const propId = 'btn_title';

  const handleLeftButtonTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('left', propId, event.target.value);
  };
  const handleRightButtonTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('right', propId, event.target.value);
  };

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Footer Buttons</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <BasicTextField label={'Left Title'} value={left} onChange={handleLeftButtonTitleChange} />
        <BasicTextField label={'Right Title'} value={right} onChange={handleRightButtonTitleChange} />
      </AccordionDetails>
    </Accordion>
  );
};
export default ScoreBoardFooter;
