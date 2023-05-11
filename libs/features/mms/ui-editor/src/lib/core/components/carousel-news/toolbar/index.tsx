import { useState } from 'react';
import { ChangeEvent, SyntheticEvent } from 'react';
import { Button } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useEditorActions } from '../../../../context';
import { CardContainer, BasicTextField } from '../../../../elements';
import { CarouselNewsComponentProps } from '../../types';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  })
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  //padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const CarouselNewsToolbar = (props: CarouselNewsComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;

  const { selectComponent } = useEditorActions();

  const updateComponenetProp = (key: string, value: string | number | null) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('title', event.target.value);
  };
  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('tag', event.target.value);
  };
  const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('desc', event.target.value);
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponenetProp('image', event.target.value);
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
                  onChange={handleTagChange}
                  sx={{ textTransform: 'uppercase' }}
                />
                <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
                <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} multiline rows={3} />
                <BasicTextField label={'Image'} value={image} onChange={handleImageChange} />
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
