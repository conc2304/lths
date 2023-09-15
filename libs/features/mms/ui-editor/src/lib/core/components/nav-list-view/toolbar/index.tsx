import { useState, SyntheticEvent } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { useEditorActions } from '../../../../context';
import { ToolContainer, BasicTextField, Accordion, AccordionSummary, AccordionDetails } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { NavListViewComponentProps } from '../../types';

const NavListViewToolbar = (props: NavListViewComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;

  const { selectComponent } = useEditorActions();
  const { handleTitleChange } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        sub_component_data: [
          ...sub_component_data,
          { title: 'New Nav Item', action: { type: 'native', page_id: 'new nav item' } },
        ],
      },
    };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      {sub_component_data.map(({ title, action }, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion expanded={expanded === panelId} onChange={handleAccordionChange(panelId)} key={`NavItem${index}`}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Nav Item #{index + 1}</Typography>
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
    </ToolContainer>
  );
};

export default NavListViewToolbar;
