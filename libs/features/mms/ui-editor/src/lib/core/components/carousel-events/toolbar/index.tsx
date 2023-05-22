import { useState } from 'react';
import { ChangeEvent, SyntheticEvent } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEditorActions } from '../../../../context';
import {
  ToolContainer,
  BasicTextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ImagePicker,
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { CarouselEventsComponentProps } from '../../types';

const CarouselEventsToolbar = (props: CarouselEventsComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;

  const { selectComponent } = useEditorActions();
  const { handleTitleChange, handleDescChange, handleImageChange, updateComponentProp } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSubTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    updateComponentProp('sub_title', event.target.value, index);
  };

  const handleAdd = () => {
    const data = { ...props, default_data: { component_data: [...component_data, { title: 'New Card' }] } };
    selectComponent(data);
  };
  return (
    <ToolContainer id={id} aria-label="Button Toolbar" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      {component_data.map(({ sub_title, title, desc, image }, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion expanded={expanded === panelId} onChange={handleAccordionChange(panelId)} key={`card_${index}`}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Slide #{index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ gap: 2 }}>
                <ImagePicker value={image} onChange={(value) => handleImageChange(value, index)} />
                <BasicTextField label={'Title'} value={title} onChange={(e) => handleTitleChange(e, index)} />
                <BasicTextField
                  label={'Sub Title'}
                  value={sub_title}
                  onChange={(e) => handleSubTitleChange(e, index)}
                  sx={{ textTransform: 'uppercase' }}
                />
                <BasicTextField
                  label={'Description'}
                  value={desc}
                  onChange={(e) => handleDescChange(e, index)}
                  multiline
                  rows={3}
                />
              </Box>
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
export default CarouselEventsToolbar;
