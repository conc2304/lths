import { useState } from 'react';
import { SyntheticEvent } from 'react';
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
import { NavListViewComponentProps } from '../../types';

const NavListViewToolbar = (props: NavListViewComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;

  const { selectComponent } = useEditorActions();
  const { handleTitleChange, updateComponentProp } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleActionChange = (key: string, value: string, index: number) => {
    updateComponentProp('action', { ...props.default_data.component_data[index].action, [key]: value }, index);
  };

  const handleAdd = () => {
    const data = { ...props, default_data: { component_data: [...component_data, { title: 'New Nav Item', action: { type: "native", page_id: "new nav item" }}] } };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      {component_data.map(({ title, action}, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion expanded={expanded === panelId} onChange={handleAccordionChange(panelId)} key={`NavItem${index}`}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Nav Item #{index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
                <Accordion>
                  <AccordionSummary>
                    <Typography>action</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      value={action?.type}
                      onChange={(event) => {handleActionChange("type", event.target.value, index)}}
                      label="type"
                      select
                    >
                      <MenuItem value={"native"}>native</MenuItem>
                      <MenuItem value={"weblink"}>weblink</MenuItem>
                    </TextField>
                    <BasicTextField label={'Page_ID'} value={action?.page_id} onChange={(event) => {handleActionChange("page_id", event.target.value, index)}} />
                    <BasicTextField label={'Page_Link'} value={action?.page_link} onChange={(event) => {handleActionChange("page_link", event.target.value, index)}} />
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

export default NavListViewToolbar;
