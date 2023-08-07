import { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { Typography, Box, Button, MenuItem } from '@mui/material';
import { Stack } from '@mui/system';

import { useEditorActions } from '../../../../context';
import {
  BasicTextField,
  ColorPicker,
  ToolContainer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { HeadlineTextBlockComponentProps } from '../../types';

const HeadLineTextBlockToolbar = (props: HeadlineTextBlockComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { card_background_color, title, text_size, text_color, linked_text },
  } = props;
  const { selectComponent } = useEditorActions();
  const { updateComponentProp } = useToolbarChange();
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('title', event.target.value);
  };
  const handleStyleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('text_size', event.target.value);
  };

  const handleAdd = () => {
    const data = {
      ...props,
      default_data: {
        card_background_color,
        title,
        text_size,
        text_color,
        linked_text: [...linked_text, { link_value: 'New link' }],
      },
    };
    selectComponent(data);
  };
  return (
    <ToolContainer id={id} aria-label="Headline Text" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      <Stack spacing={1}>
        <BasicTextField label={'Title'} value={title} onChange={(e) => handleTitleChange(e)} sx={{ mb: 4 }} />
        <ColorPicker
          label={'Background Color'}
          value={card_background_color}
          onChange={(card_background_color) => {
            updateComponentProp('card_background_color', card_background_color);
          }}
        />
        <BasicTextField value={text_size} onChange={handleStyleChange} label="Text Size" select fullWidth>
          <MenuItem value={'24'}>Small</MenuItem>
          <MenuItem value={'28'}>Medium</MenuItem>
          <MenuItem value={'32'}>Large</MenuItem>
        </BasicTextField>
        <ColorPicker
          label="Text Color"
          value={text_color}
          onChange={(text_color) => {
            updateComponentProp('text_color', text_color);
          }}
        />
        {linked_text.map(({ link_key, link_value, link_color }, index) => {
          const panelId = `panel${index}`;
          return (
            <Accordion
              expanded={expanded === panelId}
              onChange={handleAccordionChange(panelId)}
              key={`textcard_${index}`}
            >
              <AccordionSummary data-testid={`Link #${index + 1}`} aria-controls="panelld-content" id="panelld-header">
                <Typography>Link #{index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ gap: 2 }}>
                  <Stack spacing={1}>
                    <BasicTextField
                      label={'Link Key'}
                      value={link_key}
                      sx={{ textTransform: 'uppercase' }}
                      onChange={(e) => {
                        updateComponentProp('link_key', e.target.value, index, 'linked_text');
                      }}
                    />
                    <ColorPicker
                      label="Link Color"
                      value={link_color}
                      onChange={(linkcolor) => {
                        updateComponentProp('link_color', linkcolor, index, 'linked_text');
                      }}
                    />
                    <BasicTextField
                      label={'Link Value'}
                      value={link_value}
                      onChange={(e) => updateComponentProp('link_value', e.target.value, index, 'linked_text')}
                    />
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Button data-testid="HeadLine Text Add" variant="outlined" sx={{ marginTop: 3 }} onClick={handleAdd} fullWidth>
          Add
        </Button>
      </Stack>
    </ToolContainer>
  );
};
export default HeadLineTextBlockToolbar;
