import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Box, MenuItem, TextField, Typography, Button } from '@mui/material';
import { Stack } from '@mui/system';

import { useEditorActions } from '../../../../context';
import {
  BasicTextField,
  ColorPicker,
  BasicContainer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { BodyTextComponentProps } from '../../types';

const BodyTextToolbar = (props: BodyTextComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { title, card_background_color, text_color, text_size, linked_text },
  } = props;

  const { updateComponentProp } = useToolbarChange();
  const { selectComponent } = useEditorActions();
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleStyleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('text_size', event.target.value);
  };
  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleAdd = () => {
    const data = {
      ...props,
      properties_data: {
        title,
        card_background_color,
        text_color,
        text_size,
        linked_text: [...linked_text, { link_value: 'New link' }],
      },
    };
    selectComponent(data);
  };

  return (
    <BasicContainer id={id}>
      <Stack spacing={2}>
        <BasicTextField
          label={'Title'}
          value={title}
          onChange={(e) => updateComponentProp('title', e.target.value)}
          multiline
          fullWidth
        />
        <TextField value={text_size} onChange={handleStyleChange} label="text_size" select fullWidth>
          <MenuItem value={'12'}>Small</MenuItem>
          <MenuItem value={'14'}>Medium</MenuItem>
          <MenuItem value={'16'}>Large</MenuItem>
        </TextField>
        <Box>
          <ColorPicker
            label={'Background Color'}
            value={card_background_color}
            onChange={(card_background_color) => updateComponentProp('card_background_color', card_background_color)}
          />
        </Box>
        <Box>
          <ColorPicker
            label={'Text Color'}
            value={text_color}
            onChange={(text_color) => updateComponentProp('text_color', text_color)}
          />
        </Box>
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
                  <Stack spacing={2}>
                    <BasicTextField
                      label={'Link-Key'}
                      value={link_key}
                      sx={{ textTransform: 'uppercase' }}
                      onChange={(e) => {
                        updateComponentProp('link_key', e.target.value, index, 'linked_text');
                      }}
                    />
                    <ColorPicker
                      label={'Color'}
                      value={link_color}
                      onChange={(linkcolor) => {
                        updateComponentProp('link_color', linkcolor, index, 'linked_text');
                      }}
                    />
                    <BasicTextField
                      label={'Link_Value'}
                      value={link_value}
                      onChange={(e) => updateComponentProp('link_value', e.target.value, index, 'linked_text')}
                    />
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Button data-testid="Add Button" variant="outlined" sx={{ marginTop: 3 }} onClick={handleAdd} fullWidth>
          Add
        </Button>
      </Stack>
    </BasicContainer>
  );
};
export default BodyTextToolbar;
