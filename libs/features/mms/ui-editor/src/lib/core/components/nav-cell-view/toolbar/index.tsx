import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { Button, Stack, Typography, TextField, MenuItem } from '@mui/material';

import { useEditorActions } from '../../../../context';
import { ToolContainer, BasicTextField, Accordion, AccordionSummary, AccordionDetails } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { NavCellViewComponentProps } from '../../types';

const NavCellViewToolbar = (props: NavCellViewComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;

  const { selectComponent } = useEditorActions();
  const { handleTitleChange, handleActionChange, updateComponentProp } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAdd = () => {
    const data = {
      ...props,
      default_data: {
        component_data: [
          ...component_data,
          {
            title: 'Nav cell',
            icon: 'https://i.im.ge/2022/10/17/2UK1cX.Mobile-Tickets.png',
            action: { type: 'native', page_id: 'nav Cell Page Id' },
          },
        ],
      },
    };
    selectComponent(data);
  };

  const handleIconChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('icon', event.target.value, index);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      {component_data.map(({ title, action, icon }, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion expanded={expanded === panelId} onChange={handleAccordionChange(panelId)} key={`NavCell${index}`}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Nav Cell #{index + 1}</Typography>
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
                <BasicTextField label={'Icon URL'} value={icon} onChange={(e) => handleIconChange(e, index)} />
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
                    <BasicTextField
                      label={'Page_ID'}
                      value={action?.page_id}
                      onChange={(e) => {
                        handleActionChange(e, 'page_id', index);
                      }}
                    />
                    <BasicTextField
                      label={'Page_Link'}
                      value={action?.page_link}
                      onChange={(e) => {
                        handleActionChange(e, 'page_link', index);
                      }}
                    />
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

export default NavCellViewToolbar;
