import { useState } from 'react';
import { ChangeEvent, SyntheticEvent } from 'react';
import { Button, Box, Typography } from '@mui/material';

import { useEditorActions } from '../../../../context';
import {
  ToolContainer,
  BasicTextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { KeyValueComponentProps } from '../../types';

const KeyValueToolbar = (props: KeyValueComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { title, desc, component_data },
  } = props;

  const { selectComponent } = useEditorActions();
  const { handleTitleChange, handleDescChange, updateComponentProp } = useToolbarChange();

  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleKeyChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    updateComponentProp('key', event.target.value, index);
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    updateComponentProp('value', event.target.value, index);
  };

  const handleAdd = () => {
    const data = { ...props, default_data: { component_data: [...component_data, { key: 'New Key', value: 'New Value' }] } };
    selectComponent(data);
  };

  return (
    <ToolContainer id={id} aria-label="Button Toolbar">
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField
                  label={'Description'}
                  value={desc}
                  onChange={handleDescChange}
                  multiline
                  rows={3}
                />
      <Box sx={{ gap: 0 }}>
        {component_data.map(({ key, value}, index) => {
          const panelId = `panel${index}`;
          return (
            <Accordion expanded={expanded === panelId} onChange={handleAccordionChange(panelId)} key={`key_value_${index}`}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Key Value #{index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ gap: 2 }}>
                  <BasicTextField
                    label={'Key'}
                    value={key}
                    onChange={(e) => handleKeyChange(e, index)}
                    sx={{ textTransform: 'uppercase' }}
                  />
                  <BasicTextField
                    label={'Value'}
                    value={value}
                    onChange={(e) => handleValueChange(e, index)}
                    sx={{ textTransform: 'uppercase' }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Button variant="outlined" onClick={handleAdd} sx={{ marginTop: 3 }} fullWidth>
          Add
        </Button>
      </Box>
    </ToolContainer>
  );
};
export default KeyValueToolbar;
