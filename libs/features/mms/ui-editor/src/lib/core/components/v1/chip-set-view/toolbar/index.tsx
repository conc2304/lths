import { useState, SyntheticEvent } from 'react';
import { Button, Stack, Box, Typography } from '@mui/material';

import { useEditorActions } from '../../../../../context';
import { ToolContainer, BasicTextField, Accordion, AccordionSummary, AccordionDetails } from '../../../../../elements';
import { ActionToolbar } from '../../../common';
import { useToolbarChange } from '../../../hooks';
import { ChipSetViewComponentProps } from '../../../types';

const ChipSetViewToolbar = (props: ChipSetViewComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, sub_component_data },
    onPropChange,
  } = props;

  const { updateComponent } = useEditorActions();
  const { handleTitleChange } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        ...props.data,
        sub_component_data: [
          ...sub_component_data,
          { title: 'New Chip', action: { type: 'native', page_id: 'new chip' } },
        ],
      },
    };
    updateComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar">
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <Box sx={{ gap: 0 }}>
        {sub_component_data.map(({ title, action }, index) => {
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
                  <ActionToolbar action={action} onPropChange={onPropChange} />
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
