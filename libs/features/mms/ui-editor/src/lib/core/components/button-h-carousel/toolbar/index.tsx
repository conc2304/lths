import { useState, SyntheticEvent } from 'react';
import { Button, Stack, Typography, TextField, MenuItem} from '@mui/material';

import { useEditorActions } from '../../../../context';
import {
  ToolContainer,
  BasicTextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ButtonHCarouselComponentProps } from '../../types';

const ButtonHCarouselToolbar = (props: ButtonHCarouselComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;

  const { selectComponent } = useEditorActions();
  const { handleTitleChange, handleActionChange } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAdd = () => {
    const data = { ...props, default_data: { component_data: [...component_data, { title: 'NewButton', action: { type: "native", page_id: "new button" }}] } };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      {component_data.map(({ title, action}, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion expanded={expanded === panelId} onChange={handleAccordionChange(panelId)} key={`Button${index}`}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Button #{index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <BasicTextField label={'Title'} value={title} onChange={(e) => {handleTitleChange(e, index)}} />
                <Accordion>
                  <AccordionSummary>
                    <Typography>action</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      value={action?.type}
                      onChange={(e) => {handleActionChange("type", e, index)}}
                      label="type"
                      select
                    >
                      <MenuItem value={"native"}>native</MenuItem>
                      <MenuItem value={"weblink"}>weblink</MenuItem>
                    </TextField>
                    <BasicTextField label={'Page_ID'} value={action?.page_id} onChange={(e) => {handleActionChange("page_id", e, index)}} />
                    <BasicTextField label={'Page_Link'} value={action?.page_link} onChange={(e) => {handleActionChange("page_link", e, index)}} />
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Button variant="outlined" onClick={handleAdd} sx={{ marginTop: 3 }} fullWidth>
        Add
      </Button>
    </ToolContainer>
  );
};

export default ButtonHCarouselToolbar;
