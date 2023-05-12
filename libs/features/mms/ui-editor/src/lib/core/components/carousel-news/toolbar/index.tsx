import { useState } from 'react';
import { ChangeEvent, SyntheticEvent } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEditorActions } from '../../../../context';
import { CardContainer, BasicTextField, Accordion, AccordionSummary, AccordionDetails } from '../../../../elements';
import { CarouselNewsComponentProps } from '../../types';

const CarouselNewsToolbar = (props: CarouselNewsComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;

  const { selectComponent } = useEditorActions();

  const updateComponenetProp = (index: number, key: string, value: string | number | null) => {
    const data = {
      ...props,
      default_data: { component_data: component_data.map((o, i) => (i === index ? { ...o, [key]: value } : o)) },
    };
    selectComponent(data);
  };

  const handleTitleChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponenetProp(index, 'title', event.target.value);
  };
  const handleTagChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponenetProp(index, 'tag', event.target.value);
  };
  const handleDescChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponenetProp(index, 'desc', event.target.value);
  };
  const handleImageChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponenetProp(index, 'image', event.target.value);
  };
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleAdd = () => {
    const data = { ...props, default_data: { component_data: [...component_data, { title: 'New Card' }] } };
    selectComponent(data);
  };
  return (
    <CardContainer id={`${id}_toolbar`} aria-label="Button Toolbar" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      {component_data.map(({ tag, title, desc, image }, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion expanded={expanded === panelId} onChange={handleChange(panelId)} key={`card_${index}`}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Slide #{index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ gap: 2 }}>
                <BasicTextField
                  label={'Tag'}
                  value={tag}
                  onChange={(e) => handleTagChange(index, e)}
                  sx={{ textTransform: 'uppercase' }}
                />
                <BasicTextField label={'Title'} value={title} onChange={(e) => handleTitleChange(index, e)} />
                <BasicTextField
                  label={'Description'}
                  value={desc}
                  onChange={(e) => handleDescChange(index, e)}
                  multiline
                  rows={3}
                />
                <BasicTextField label={'Image'} value={image} onChange={(e) => handleImageChange(index, e)} />
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Button variant="outlined" onClick={handleAdd} sx={{ marginTop: 3 }} fullWidth>
        Add
      </Button>
    </CardContainer>
  );
};
export default CarouselNewsToolbar;
