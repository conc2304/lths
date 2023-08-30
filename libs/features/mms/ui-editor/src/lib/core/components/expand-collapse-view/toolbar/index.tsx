import { useState, SyntheticEvent } from 'react';
import { Button, Stack, Typography } from '@mui/material';

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
import { ExpandCollapseViewComponentProps } from '../../types';

const ExpandCollapseViewToolbar = (props: ExpandCollapseViewComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
  } = props;

  const { selectComponent } = useEditorActions();
  const { handleTitleChange, handleDescChange, handleActionChange } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAdd = () => {
    const data = {
      ...props,
      properties_data: {
        sub_properties_data: [
          ...sub_properties_data,
          { title: 'Expand/Collapse Item', action: { type: 'expand/collapse', page_id: 'Expand/Collapse Item' } },
        ],
      },
    };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      {sub_properties_data.map(({ title, desc, action }, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion
            expanded={expanded === panelId}
            onChange={handleAccordionChange(panelId)}
            key={`ExpandCollapseItem${index}`}
          >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Expand/Collapse Item #{index + 1}</Typography>
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
                <BasicTextField
                  label={'Description'}
                  value={desc}
                  onChange={(e) => handleDescChange(e, index)}
                  multiline
                  rows={3}
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
    </ToolContainer>
  );
};

export default ExpandCollapseViewToolbar;
