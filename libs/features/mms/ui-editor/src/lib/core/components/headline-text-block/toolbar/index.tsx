import { ChangeEvent, useState, SyntheticEvent } from 'react';
import { Typography, Box, MenuItem, TextField, Button } from '@mui/material';
import { Stack } from '@mui/system';

import { useEditorActions } from '../../../../context';
import { ToolContainer, Accordion, AccordionSummary, AccordionDetails } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HeadlineTextBlockComponentProps } from '../../types';
import { size } from '../utils';

const HeadLineTextBlockToolbar = (props: HeadlineTextBlockComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, text_size, linked_text, action },
    onPropChange,
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
      data: { title, text_size, linked_text: [...linked_text, { link_value: 'New link' }] },
    };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Headline Text" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      <Stack spacing={2}>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Title
        </Typography>
        <TextField label={'Title'} value={title} onChange={(e) => handleTitleChange(e)} sx={{ mb: 4 }} />

        <TextField value={text_size} onChange={handleStyleChange} label="Text Size" select fullWidth>
          {size.map((s) => (
            <MenuItem key={`option-${s.value}`} value={s.value}>
              {s.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Link
        </Typography>
        {linked_text.map(({ link_key, link_value }, index) => {
          const panelId = `panel${index}`;
          return (
            <Accordion
              expanded={expanded === panelId}
              onChange={handleAccordionChange(panelId)}
              key={`textcard_${index}`}
            >
              <AccordionSummary data-testid={`Link #${index + 1}`} aria-controls="panelld-content" id="panelld-header">
                <Typography>Link {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ gap: 2 }}>
                  <Stack spacing={2}>
                    <TextField
                      label={'Link Key'}
                      value={link_key}
                      sx={{ textTransform: 'uppercase' }}
                      onChange={(e) => {
                        updateComponentProp('link_key', e.target.value, index, 'linked_text');
                      }}
                    />

                    <TextField
                      label={'Link Value'}
                      value={link_value}
                      onChange={(e) => updateComponentProp('link_value', e.target.value, index, 'linked_text')}
                    />
                    <ActionToolbar action={action} onPropChange={onPropChange} index={index} keys={['linked_text']} />
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Button data-testid="Add Button" variant="outlined" sx={{ marginTop: 3 }} onClick={handleAdd} fullWidth>
          Add Link
        </Button>
      </Stack>
    </ToolContainer>
  );
};
export default HeadLineTextBlockToolbar;
