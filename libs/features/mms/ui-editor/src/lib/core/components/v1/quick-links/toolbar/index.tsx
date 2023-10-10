import { useState, SyntheticEvent } from 'react';
import { Typography, Stack, Button } from '@mui/material';

import { useEditorActions } from '../../../../../context';
import { BasicContainer, BasicTextField, Accordion, AccordionSummary, AccordionDetails } from '../../../../../elements';
import { ActionToolbar } from '../../../common';
import { useToolbarChange } from '../../../hooks';
import { QuickLinksProps } from '../../../types';

export default function QuickLinksToolbar(props: QuickLinksProps) {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;
  const { handleTitleChange, handleIconChange } = useToolbarChange();
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { selectComponent } = useEditorActions();
  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        sub_component_data: [
          ...sub_component_data,
          { title: 'New Segment', icon: 'https://i.im.ge/2022/12/05/S82BeW.Group.png' },
        ],
      },
    };
    selectComponent(data);
  };

  return (
    <BasicContainer id={id}>
      {sub_component_data?.map((props, i) => {
        const panelId = `panel${i}`;
        return (
          <Accordion expanded={expanded === panelId} onChange={handleAccordionChange(panelId)} key={`quick_links_${i}`}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Slide #{i + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <BasicTextField label={'Title'} value={props.title} onChange={(e) => handleTitleChange(e, i)} />
                <BasicTextField label={'Icon URL'} value={props.icon} onChange={(e) => handleIconChange(e, i)} />
                <ActionToolbar action={props?.action} onPropChange={onPropChange} />
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Button variant="outlined" onClick={handleAdd} sx={{ marginTop: 3 }} fullWidth>
        Add
      </Button>
    </BasicContainer>
  );
}
