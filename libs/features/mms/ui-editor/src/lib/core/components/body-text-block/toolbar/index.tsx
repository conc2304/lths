import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Box, MenuItem, TextField, Typography, Button } from '@mui/material';
import { Stack } from '@mui/system';

import { useEditorActions } from '../../../../context';
import {
  BasicTextField,
  BasicContainer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  GroupLabel,
  OutlinedTextField,
} from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { BodyTextComponentProps } from '../../types';
import { size } from '../utils';

const BodyTextToolbar = (props: BodyTextComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { title, card_background_color, text_size, linked_text, action },
    onPropChange,
  } = props;

  const { updateComponentProp, handleTitleChange } = useToolbarChange();
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
        linked_text: [...linked_text, { link_value: 'New link' }],
      },
    };
    selectComponent(data);
  };

  return (
    <BasicContainer id={id}>
      <Stack spacing={2}>
        <GroupLabel label={'Text'} />
        <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
        <TextField value={text_size} onChange={handleStyleChange} label="Text Size" select fullWidth>
          {size.map((s) => (
            <MenuItem key={`option-${s.value}`} value={s.value}>
              {s.label}
            </MenuItem>
          ))}
        </TextField>
        {linked_text.map(({ link_key }, index) => {
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
                    <BasicTextField
                      label={'Link Key'}
                      value={link_key}
                      sx={{ textTransform: 'uppercase' }}
                      onChange={(e) => {
                        updateComponentProp('link_key', e.target.value, index, 'linked_text');
                      }}
                    />
                    <ActionToolbar action={action} onPropChange={onPropChange} />
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
