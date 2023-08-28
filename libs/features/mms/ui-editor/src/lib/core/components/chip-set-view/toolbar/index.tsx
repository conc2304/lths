import { useState, SyntheticEvent } from 'react';
import { Button, Stack, Box, Typography } from '@mui/material';

import { useEditorActions } from '../../../../context';
import {
  ToolContainer,
  BasicTextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ActionAccordion,
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ChipSetViewComponentProps } from '../../types';

const ChipSetViewToolbar = (props: ChipSetViewComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { title, sub_properties_data },
  } = props;

  const { selectComponent } = useEditorActions();
  const { handleTitleChange, handleActionChange } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAdd = () => {
    const data = {
      ...props,
      properties_data: {
        ...props.properties_data,
        sub_properties_data: [
          ...sub_properties_data,
          { title: 'New Chip', action: { type: 'native', page_id: 'new chip' } },
        ],
      },
    };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar">
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <Box sx={{ gap: 0 }}>
        {sub_properties_data.map(({ title, action }, index) => {
          const panelId = `panel${index}`;
          return (
            <Accordion expanded={expanded === panelId} onChange={handleAccordionChange(panelId)} key={`Chip${index}`}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Chip #{index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <BasicTextField
                    label={'Title'}
                    value={title}
                    onChange={(e) => {
                      handleTitleChange(e, index);
                    }}
                  />
                  <ActionAccordion action={action} index={index} handleActionChange={handleActionChange} />
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Button variant="outlined" onClick={handleAdd} sx={{ marginTop: 3 }} fullWidth>
          Add
        </Button>
      </Box>
    </ToolContainer>
  );
};

export default ChipSetViewToolbar;
