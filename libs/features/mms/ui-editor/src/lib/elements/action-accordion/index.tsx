import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, MenuItem } from '@mui/material';

interface ActionAccordionProps {
  action: {
    type?: string;
    page_id?: string;
    page_link?: string;
  };
  index?: number | undefined;
  handleActionChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    index: number
  ) => void;
}

export const ActionAccordion: React.FC<ActionAccordionProps> = ({ action, index, handleActionChange }) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>action</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          value={action?.type}
          onChange={(e) => {
            handleActionChange(e, 'type', index);
          }}
          label="type"
          select
        >
          <MenuItem value={'native'}>native</MenuItem>
          <MenuItem value={'weblink'}>weblink</MenuItem>
        </TextField>
        <TextField
          label={'Page Id'}
          value={action?.page_id}
          onChange={(e) => {
            handleActionChange(e, 'page_id', index);
          }}
        />
        <TextField
          label={'Page Link'}
          value={action?.page_link}
          onChange={(e) => {
            handleActionChange(e, 'page_link', index);
          }}
        />
      </AccordionDetails>
    </Accordion>
  );
};
