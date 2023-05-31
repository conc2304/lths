import { ReactNode, SyntheticEvent, useState } from 'react';
import { Button, Typography } from '@mui/material';

import { AccordionDetails, Accordion, AccordionSummary } from '../basic';

type AccordionListProps = {
  items: any;
  renderItem: (item: any, index: number) => ReactNode;
  onAddClick?: () => void;
  titlePrefix?: string;
};
const AccordionList = ({ items, renderItem, onAddClick, titlePrefix = 'Slide' }: AccordionListProps) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      {items.map((item: any, index: number) => {
        const panelId = `panel${index}`;
        return (
          <Accordion expanded={expanded === panelId} onChange={handleChange(panelId)} key={`card_${index}`}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>
                {titlePrefix} #{index + 1}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{renderItem(item, index)}</AccordionDetails>
          </Accordion>
        );
      })}
      {onAddClick && (
        <Button variant="outlined" onClick={onAddClick} sx={{ marginTop: 3 }} fullWidth>
          Add
        </Button>
      )}
    </>
  );
};
export default AccordionList;
